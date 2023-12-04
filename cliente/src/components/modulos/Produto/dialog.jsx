import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./dialog.module.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function FormDialog(props) {
  let nomeDoFornecedor = "";
  const [editValues, setEditValues] = useState({
    id: props.id,
    nome: props.nome,
    valor: props.valor,
    marca: props.marca === "" ? "Marca não cadastrada" : props.marca,
    unidade: props.unidade,
    medida: props.medida,
    fornecedor: props.idfornecedor,
    forncedorNome: props.fornecedor.razao_social
  });

  const handleEditProduto = () => {
    if (
      editValues.nome.trim() === "" ||
      editValues.valor.trim() === "" ||
      editValues.unidade.trim() === "" ||
      editValues.medida.trim() === ""
    ) {
    
      toast.error("Preencha todos os campos!");
    } else {
      console.log("nome " + nomeDoFornecedor)
      axios
        .put("http://localhost:3002/editarProduto", {
          idproduto: editValues.id,
          nome: editValues.nome,
          valor: editValues.valor,
          marca: editValues.marca,
          unidade: editValues.unidade,
          medida: editValues.medida,
          fornecedor: editValues.fornecedor,
        })
        .then((response) => {
          toast.success(response.data);
          window.location.reload();
          handleClose();

          const updatedDataList = props.listDados.map((data) => {
            if (data.idproduto === editValues.id) {
              return {
                ...data,
                nome: editValues.nome,
                valor: editValues.valor,
                marca: editValues.marca,
                unidade: editValues.unidade,
                medida: editValues.medida,
                fornecedor: editValues.fornecedor,
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
  };

  const handleDeleteProduto = async () => {
    let res = window.confirm(
      "Ao excluir esse produto, o mesmo será removido também dos outros módulos. Deseja confirmar?"
    );
    if (res) {
      axios
        .delete(`http://localhost:3002/delete/${editValues.id}`)
        .then((response) => {
          toast.success(response.data);
          handleClose();

          const updatedDataList = props.listDados.filter(
            (data) => data.idproduto !== editValues.id
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
  
    if (id === "fornecedor") {
      const selectedFornecedor = fornecedores.find(
        (fornecedor) => fornecedor.id === value
      );
  
      setEditValues((prevValues) => ({
        ...prevValues,
        fornecedor: value,
        forncedorNome: selectedFornecedor ? selectedFornecedor.razao_social : "",
      }));
    } else {
      setEditValues((prevValues) => ({
        ...prevValues,
        [id]: value,
      }));
    }
  };

  const [fornecedores, setFornecedores] = useState([]);
  useEffect(() => {
    const getFornecedor = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getFornecedor");
        const savedData = response.data;
        console.log(savedData);
        setFornecedores(savedData);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    getFornecedor();
  }, []);

  function setFornecedore(nome){
    nomeDoFornecedor = nome;
    console.log("nome do forncedor " + nomeDoFornecedor);
    return nome;
  }

  return (
    <Modal show={props.open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Alterar dados do(a) {props.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nome">
            <Form.Label>Nome do Produto *:</Form.Label>
            <Form.Control
              type="text"
              value={editValues.nome}
              onChange={handleChangeValues}
            />
          </Form.Group>
          <Form.Group controlId="valor">
            <Form.Label>Preço do Produto *:</Form.Label>
            <Form.Control
              type="number"
              value={editValues.valor}
              onChange={handleChangeValues}
            />
          </Form.Group>
          <Form.Group controlId="marca">
            <Form.Label>Marca do Produto *: </Form.Label>
            <Form.Control
              type="text"
              value={editValues.marca}
              onChange={handleChangeValues}
            />
          </Form.Group>
          <Form.Group controlId="medida">
            <Form.Label>Medida do Produto *:</Form.Label>
            <Form.Control
              type="text"
              value={editValues.medida}
              onChange={handleChangeValues}
            />
          </Form.Group>

          <label htmlFor="unidade">Selecione a medida *:</label>

              <select
                id="unidade"
                name="unidade"
                className={styles.select}
                required
                value={editValues.unidade}
                onChange={handleChangeValues}
              >
                <option value="kg">Quilogramas (kg)</option>
                <option value="g">Gramas (g)</option>
                <option value="L">Litros (L)</option>
                <option value="ml">Mililitros (ml)</option>
                <option value="u">Unidade (u)</option>
              </select>
          
          <>
            <div className={styles.fornecedor}>
              <label htmlFor="">Selecione um fornecedor *:</label>
              <select
                id="fornecedor"
                name="fornecedor"
                className={styles.select}
                value={editValues.fornecedor}
                onChange={handleChangeValues}
              >
                <option value="">Selecione um fornecedor</option>
                <option value="0">
                  Produto sem fornecedor
                </option>
                {fornecedores.map((iten) => (
          
                  <option
                    className={styles.option}
                    key={iten.id}
                    value={iten.id}
                  >
                    {setFornecedore(iten.razao_social)}
                  </option>
                ))}
              </select>
            </div>
          </>
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
