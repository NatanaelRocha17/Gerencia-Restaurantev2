import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./dialog.module.css";
import axios from "axios";



export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    nome: props.nome,
    valor: props.valor,
    marca: props.marca,
    unidade: props.unidade,
    medida: props.medida,
    fornecedor: props.fornecedor,
  });

  const handleEditProduto = () => {
    axios.put("http://localhost:3002/editarProduto", {
      idproduto: editValues.id,
      nome: editValues.nome,
      valor: editValues.valor,
      marca: editValues.marca,
      unidade: editValues.unidade,
      medida: editValues.medida,
      fornecedor: editValues.fornecedor,
    });
    handleClose();
  };

  const handleDeleteProduto = async () => {
   let res =  window.confirm("Ao excluir esse produto, o mesmo será removido também dos outros modulos. Deseja confirmar?")
   if(res){
    axios.delete(`http://localhost:3002/delete/${editValues.id}`);
    handleClose();
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
        <Modal.Title>Editar dados do(a) {props.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          
          <Form.Group controlId="nome">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control
              type="text"
              value={editValues.nome}
              onChange={handleChangeValues}
            />
          </Form.Group>

          <Form.Group controlId="valor">
            <Form.Label>Preço do Produto</Form.Label>
            <Form.Control
              type="number"
              value={editValues.valor}
              onChange={handleChangeValues}
            />
          </Form.Group>

          <Form.Group controlId="marca">
            <Form.Label>Marca do Produto</Form.Label>
            <Form.Control
              type="text"
              value={editValues.marca}
              onChange={handleChangeValues}
            />
          </Form.Group>

          <Form.Group controlId="unidade">
            <Form.Label>Selecione a unidade de medida</Form.Label>
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle variant="secondary">
                {editValues.unidade}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleChangeValues({ target: { id: "unidade", value: "kg" } })}
                >
                  Quilogramas (kg)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleChangeValues({ target: { id: "unidade", value: "g" } })}
                >
                  Gramas (g)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleChangeValues({ target: { id: "unidade", value: "litros" } })}
                >
                  Litros (L)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleChangeValues({ target: { id: "unidade", value: "ml" } })}
                >
                  Mililitros (ml)
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          <Form.Group controlId="medida">
            <Form.Label>Medida do Produto</Form.Label>
            <Form.Control
              type="text"
              value={editValues.medida}
              onChange={handleChangeValues}
            />
          </Form.Group>

          <Form.Group controlId="fornecedor">
            <Form.Label>Fornecedor do Produto</Form.Label>
            <Form.Control
              type="text"
              value={editValues.fornecedor}
              onChange={handleChangeValues}
            />
          </Form.Group>
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
