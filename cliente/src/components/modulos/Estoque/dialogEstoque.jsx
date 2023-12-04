import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//import { Dropdown } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./dialogEstoque.module.css";
import { toast } from "react-toastify";

// Function to format the date
const formatData = (date) => {
  if (date) {
    return new Date(date).toISOString().split("T")[0];
  }
  return "";
};

export default function FormDialogEstoque(props) {
  console.log("editValues")

  const [produtos, setProdutos] = useState([]);
  const [editValues, setEditValues] = useState({
    idestoque: props.idestoque,
    nome: props.nome,
    idproduto: props.idproduto,
    lote: props.lote,
    quantidade: props.quantidade,
    dataValidade: props.dataValidade,
  });
  console.log("editValues")
  console.log(editValues);
  useEffect(() => {
    axios.get("http://localhost:3002/getProdutos").then((response) => {
      setProdutos(response.data);
    });
  }, []);

  const handleEditProduto = () => {
    if (
      editValues.idproduto === "" ||
      editValues.idestoque === "" ||
      editValues.quantidade === "" ||
      editValues.lote === ""
    ) {
      toast.error("Preencha todos os campos!");
    } else {
      axios
        .put("http://localhost:3002/editarProdutoEstoque", {
          idproduto: editValues.idproduto,
          idestoque: editValues.idestoque,
          lote: editValues.lote,
          quantidade: editValues.quantidade,
          dataValidade: formatData(editValues.dataValidade),
        })
        .then((response) => {
          toast.success(response.data);
          handleClose();
          console.log("editValues")
          console.log(editValues.nome)
          // Atualize a lista de dados no componente ExibirDados
          const updatedDataList = props.listDados.map((data) => {
            if (data.idestoque === editValues.idestoque) {
              return {
                ...data,
                idproduto: editValues.idproduto,
                idestoque: editValues.idestoque,
                nome:editValues.nome,
                lote: editValues.lote,
                quantidade: editValues.quantidade,
                dataValidade: formatData(editValues.dataValidade),
              };
            }
            return data;
          });
          window.location.reload()
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
  };

  const handleDeleteProduto = () => {
    console.log("Id a ser removido:  " + editValues.idestoque)
    let res = window.confirm("Deseja excluir o produto do estoque?");
    if (res) {
      axios
        .delete(
          `http://localhost:3002/deleteProdutoEstoque/${editValues.idestoque}`
        )
        .then((response) => {
          
          toast.success(response.data);
          handleClose();
        


          // Atualize a lista de dados no componente ExibirDados após a exclusão
          const updatedDataList = props.listDados.filter(
            (data) => data.idestoque !== editValues.idestoque
          );
          props.setListDados(updatedDataList);
        });
      axios.delete(
        `http://localhost:3002/deleteProdutoEstoque/${editValues.id}`
      );
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
    console.log("")
    console.log(editValues)

  };

  return (
    <Modal show={props.open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Alterar dados do(a) {props.nome} no estoque</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="idproduto">
            <Form.Label>Selecione um produto:</Form.Label>
            <Form.Control
            
              className={styles.comprimento}
              as="select"
              value={editValues.idproduto}
              onChange={handleChangeValues}
            >
              {produtos.map((produto) => (
                <option controlId="nome" onChange={handleChangeValues} key={produto.idproduto} value={produto.idproduto}>
                  {produto.nome} - {produto.medida}
                  {produto.unidade} - {produto.marca}
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
