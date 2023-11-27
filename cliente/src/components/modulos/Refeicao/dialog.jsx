import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";


export default function RefeicaoDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.idRefeicao,
    nome: props.nome,
    valor: props.valor,
  });
  console.log(editValues.id)
  const handleEditRefeicao = () => {
   
    axios
      .put("http://localhost:3002/editarRefeicao", {
        id : editValues.id,
        nome: editValues.nome,
        valor: editValues.valor,
      })
      .then((response) => {
        toast.success(response.data);
        handleClose();

        const updatedDataList = props.listDados.map((data) => {
          if (data.idRefeicao === editValues.id) {
            return {
              ...data,
              nome: editValues.nome,
              valor: editValues.valor,
            };
          }
          return data;
        });

        props.setListDados(updatedDataList);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          toast.warning(error.response.data);
        } else {
          toast.warning("Erro ao editar refeição");
        }
      });
  };

  const handleDeleteRefeicao = async () => {
    let res = window.confirm("Ao excluir essa refeição, a mesma será removida também dos outros módulos. Deseja confirmar?");
    if (res) {
      axios
        .delete(`http://localhost:3002/deleteRefeicao/${editValues.id}`)
        .then((response) => {
          toast.success(response.data);
          handleClose();

          const updatedDataList = props.listDados.filter((data) => data.idRefeicao !== editValues.id);
          props.setListDados(updatedDataList);
        });
    }
  };

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

  

  return (
    <Modal show={props.open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar dados da refeição {props.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nome">
            <Form.Label>Nome da Refeição</Form.Label>
            <Form.Control
              type="text"
              value={editValues.nome}
              onChange={handleChangeValues}
            />

          </Form.Group>
  
          <Form.Group controlId="valor">
            <Form.Label>Valor da Refeição R$</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={editValues.valor}
              onChange={handleChangeValues}
            />
          
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDeleteRefeicao}>
          Excluir
        </Button>
        <Button variant="primary" onClick={handleEditRefeicao}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
