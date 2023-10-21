import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to format the date
const formatData = (date) => {
  if (date) {
    return new Date(date).toISOString().split("T")[0];
  }
  return "";
};

export default function FormDialogEstoque(props) {
  const [produtos, setProdutos] = useState([]);
  const [editValues, setEditValues] = useState({
    idestoque: props.idestoque,
    idproduto: props.idproduto,
    lote: props.lote,
    quantidade: props.quantidade,
    dataValidade: props.dataValidade,
  });

  useEffect(() => {
    axios.get("http://localhost:3002/getProdutos").then((response) => {
      setProdutos(response.data);
    });
  }, []);

  const handleEditProduto = () => {
    axios.put("http://localhost:3002/editarProdutoEstoque", {
      idproduto: editValues.idproduto,
      idestoque: editValues.idestoque,
      lote: editValues.lote,
      quantidade: editValues.quantidade,
      dataValidade: formatData(editValues.dataValidade),
    });
  };

  const handleDeleteProduto = () => {
    console.log(`Id do item para remover ${editValues.idestoque}`);
    axios.delete(
      `http://localhost:3002/deleteProdutoEstoque/${editValues.idestoque}`
    );
    axios.delete(`http://localhost:3002/delete/${editValues.idproduto}`);
    handleClose();
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
        <Modal.Title>Editar dados do(a) {props.nome} no estoque</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="idproduto">
            <Form.Label>Selecione um produto:</Form.Label>
            <Form.Control
              as="select"
              value={editValues.idproduto}
              onChange={handleChangeValues}
            >
              {produtos.map((produto) => (
                <option key={produto.idproduto} value={produto.idproduto}>
                  {produto.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="quantidade">
            <Form.Label>Quantidade de itens do Produto</Form.Label>
            <Form.Control
              type="number"
              value={editValues.quantidade}
              onChange={handleChangeValues}
            />
          </Form.Group>

          <Form.Group controlId="lote">
            <Form.Label>Lote do Produto no Estoque</Form.Label>
            <Form.Control
              type="text"
              value={editValues.lote}
              onChange={handleChangeValues}
            />
          </Form.Group>

          <Form.Group controlId="dataValidade">
            <Form.Label>Data de validade do lote</Form.Label>
            <Form.Control
              type="date"
              value={formatData(editValues.dataValidade)}
              onChange={handleChangeValues}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
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
