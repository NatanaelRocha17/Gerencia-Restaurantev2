import React, { useState, useEffect } from "react";


import styles from "./dialogEstoque.module.css";

import axios from "axios";

// Function to format the date
const formatData = (date) => {
  if (date) {
    return new Date(date).toISOString().split("T")[0];
  }
  return "";
};

// Defina a função `useStyles` aqui fora

export default function FormDialogEstoque(props) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/getProdutos").then((response) => {
      setProdutos(response.data);
    });
  }, []);

  const [editValues, setEditValues] = useState({
    idestoque: props.idestoque,
    idproduto: props.idproduto,
    lote: props.lote,
    quantidade: props.quantidade,
    dataValidade: props.dataValidade, // Format data here
  });

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
    <div>
      <h1>Caixa de dialogo</h1>
    </div>
  );
}
