import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import { Dropdown } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./dialogFornecedor.module.css";
import { toast } from "react-toastify";

export default function FormDialogEstoque(props) {
  console.log(props);
  const [editValues, setEditValues] = useState({
    id: props.dados.id,
    razao_social: props.dados.razao_social,
    telefone: props.dados.telefone,
    email: props.dados.email,
    cnpj: props.dados.cnpj,
    logradouro: props.dados.enderecos[0].rua,
    cep: props.dados.enderecos[0].codigo_postal,
    numero: props.dados.enderecos[0].numero,
    cidade: props.dados.enderecos[0].cidade,
    uf: props.dados.enderecos[0].estado,
    bairro: props.dados.enderecos[0].bairro,
  });

  const handleEditProduto = () => {
    if (
      editValues.id === "" ||
      editValues.razao_social === "" ||
      editValues.cnpj === ""
    ) {
      toast.error("Preencha todos os campos!");
    } else {
      axios
        .put("http://localhost:3002/editarFornecedor", {
          id: editValues.id,
          razao_social: editValues.razao_social,
          telefone: editValues.telefone,
          email: editValues.email,
          cnpj: editValues.cnpj,
          logradouro: editValues.logradouro,
          cep: editValues.cep,
          numero: editValues.numero,
          cidade: editValues.cidade,
          uf: editValues.uf,
          bairro: editValues.bairro,
        })
        .then((response) => {
          console.log(response);
          toast.success(response.data);
          handleClose();
          // Atualize a lista de dados no componente ExibirDados

          const updatedDataList = props.listDados.map((data) => {
            if (data.id === editValues.id) {
              return {
                ...data,
                id: editValues.id,
                razao_social: editValues.razao_social,
                telefone: editValues.telefone,
                email: editValues.email,
                cnpj: editValues.cnpj,
                logradouro: editValues.logradouro,
                cep: editValues.cep,
                numero: editValues.numero,
                cidade: editValues.cidade,
                uf: editValues.uf,
                bairro: editValues.bairro,
              };
            }
            return data;
          });
          console.log(updatedDataList);
          props.setListDados(updatedDataList);
        })
        .catch((error) => {
          console.log("EERROS " + error);

          if (error.status === 400) {
            toast.warning(error.response.data);
          } else {
            toast.error(error.response.data);
          }
        });
    }
  };

  const handleDeleteProduto = () => {
    let res = window.confirm("Deseja excluir este fornecedor?");
    if (res) {
      axios
        .delete(`http://localhost:3002/deleteFornecedor/${editValues.id}`)
        .then((response) => {
          toast.success(response.data);
          handleClose();

          // Atualize a lista de dados no componente ExibirDados após a exclusão
          const updatedDataList = props.listDados.filter(
            (data) => data.id !== editValues.id
          );
          props.setListDados(updatedDataList);
        });
      axios.delete(`http://localhost:3002/deleteFornecedor/${editValues.id}`);
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
    console.log("");
    console.log(editValues);
  };
  console.log("VENDO" + editValues.razao_social);
  return (
    <Modal show={props.open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Editar dados do(a) fornecedor: {props.dados.razao_social}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className={styles.inputs}>
            <Form.Group controlId="razao_social">
              <Form.Label>Razão Social</Form.Label>
              <Form.Control
                type="text"
                value={editValues.razao_social}
                onChange={handleChangeValues}
              />
            </Form.Group>

            <Form.Group controlId="cnpj">
              <Form.Label>Informe o CNPJ</Form.Label>
              <Form.Control
                type="text"
                value={editValues.cnpj}
                onChange={handleChangeValues}
              />
            </Form.Group>
          </div>
          <div className={styles.inputs}>
            <Form.Group controlId="telefone">
              <Form.Label>Contato do fornecedor</Form.Label>
              <Form.Control
                type="tel"
                value={editValues.telefone}
                onChange={handleChangeValues}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Endereço de e-mail</Form.Label>
              <Form.Control
                type="email"
                value={editValues.email}
                onChange={handleChangeValues}
              />
            </Form.Group>
          </div>
          <div className="addres">
            <div className={styles.inputs}>
              <Form.Group controlId="cep">
                <Form.Label>CEP:</Form.Label>
                <Form.Control
                  type="text"
                  value={editValues.cep}
                  onChange={handleChangeValues}
                  maxLength="8"
                />
              </Form.Group>

              <Form.Group controlId="logradouro">
                <Form.Label>Logradouro:</Form.Label>
                <Form.Control
                  type="text"
                  value={editValues.logradouro}
                  onChange={handleChangeValues}
                />
              </Form.Group>
            </div>
            <div className={styles.inputs}>
              <Form.Group controlId="numero">
                <Form.Label>Nº:</Form.Label>
                <Form.Control
                  type="text"
                  value={editValues.numero}
                  onChange={handleChangeValues}
                />
              </Form.Group>

              <Form.Group controlId="bairro">
                <Form.Label>Bairro:</Form.Label>
                <Form.Control
                  type="text"
                  value={editValues.bairro}
                  onChange={handleChangeValues}
                />
              </Form.Group>
            </div>
            <div className={styles.inputs}>
              <Form.Group controlId="cidade">
                <Form.Label>Cidade:</Form.Label>
                <Form.Control
                  type="text"
                  value={editValues.cidade}
                  onChange={handleChangeValues}
                />
              </Form.Group>

              <Form.Group controlId="uf">
                <Form.Label>UF:</Form.Label>
                <Form.Control
                  type="text"
                  value={editValues.uf}
                  onChange={handleChangeValues}
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDeleteProduto}>
          Excluir
        </Button>
        <Button variant="primary" onClick={handleEditProduto}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
