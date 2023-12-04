import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./dialogCliente.module.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function DialogClientes(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    nome: props.nome,
    telefone: props.telefone,
    cpf: props.cpf,
    email: props.email === "" ? "E-mail não informado" : props.email,
  });

  console.log(props.listDados)
  const handleEditCliente = () => {
    if (
      editValues.nome.trim() === "" ||
      editValues.telefone.trim() === "" ||
      editValues.cpf.trim() === ""
    
    ) {
      toast.error("Preencha todos os campos!");
     
    } else {
      if(editValues.cpf.length !== 14){
        toast.error("CPF não é válido!");
      }else{
        
      axios
        .put("http://localhost:3002/editarCliente", {
          idCliente: editValues.id,
          nome: editValues.nome,
          telefone: editValues.telefone,
          cpf: editValues.cpf,
          email: editValues.email,
        })
        .then((response) => {
          toast.success(response.data);
          handleClose();
          console.log(props.listDados)
          // Atualize a lista de dados no componente ExibirDados
          const updatedDataList = props.listDados.map((data) => {
            if (data.idCliente === editValues.id) {
              console.log("essa é data" + data);
              return {
                ...data,
                nome: editValues.nome,
                telefone: editValues.telefone,
                cpf: editValues.cpf,
                email: editValues.email
              };
            }
            return data;
          });

          props.setListDados(updatedDataList);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            toast.warning(error.response.data);
          } else {
            toast.warning(error.response.data);
          }
        });
      }
    }
  }
  const handleDeleteCliente = async () => {
    let res = window.confirm("Você irá excluir o cliente. Deseja confirmar?");
    if (res) {
      axios
        .delete(`http://localhost:3002/deleteCliente/${editValues.id}`)
        .then((response) => {
        
          handleClose();
          toast.success(response.data);
          window.location.reload();
          // Atualize a lista de dados no componente ExibirDados após a exclusão
          const updatedDataList = props.listDados.filter((data) => data.idCliente !== editValues.id);
          props.setListDados(updatedDataList);
        
      
        });
        
    }
  }

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChangeValues = (event) => {
    const { id, value } = event.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };


  const formatarCPF = (valor) => {
    const numerosCPF = valor.replace(/\D/g, "");
    if (numerosCPF.length <= 11) {
      return numerosCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return valor;
  };

  // Lidar com a mudança no input de CPF
  const lidarComMudancaCPF = (e) => {
    const cpfFormatado = formatarCPF(e.target.value);
    setEditValues({ ...editValues, cpf: cpfFormatado });
  };


  return (
    <Modal show={props.open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Alterar dados de {props.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group controlId="nome">
            <Form.Label>Nome do Cliente *:</Form.Label>
            <Form.Control
              type="text"
              value={editValues.nome}
              onChange={handleChangeValues}
            />
          </Form.Group>
          <Form.Group controlId="telefone">
            <Form.Label>Telefone *:</Form.Label>
            <Form.Control
              type="tel"
              value={editValues.telefone}
              onChange={handleChangeValues}
            />
          </Form.Group>
          <Form.Group controlId="cpf">
            <Form.Label>CPF *:</Form.Label>
            <Form.Control
              type="text"
              maxLength={14}
              value={editValues.cpf}
              onChange={lidarComMudancaCPF}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>E-mail :</Form.Label>
            <Form.Control
              type="email"
              value={editValues.email}
              onChange={handleChangeValues}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDeleteCliente}>
          Excluir
        </Button>
        <Button variant="primary" onClick={handleEditCliente}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
