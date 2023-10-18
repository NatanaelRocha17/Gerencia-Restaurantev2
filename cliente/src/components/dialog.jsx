import React, { useState } from "react";


import styles from  "./dialog.module.css"

import axios from "axios";


export default function FormDialog(props) {

  const [editValues, setEditValues] = useState({
    id:props.id,
    nome:props.nome,
    valor:props.valor,
    marca: props.marca,
    unidade: props.unidade,
    medida: props.medida,
    fornecedor:props.fornecedor
  })
 

  const handleEditProduto = () => {
    console.log(editValues)
  
    axios.put("http://localhost:3002/editarProduto", {
      idproduto: editValues.id,
      nome: editValues.nome,
      valor: editValues.valor,
      marca: editValues.marca,
      unidade: editValues.unidade,
      medida: editValues.medida,
      fornecedor: editValues.fornecedor
    });
  };
  
  const handleDeleteProduto = async () => {
    axios.delete(`http://localhost:3002/delete/${editValues.id}`)
    handleClose()
  }

  const handleClose = () => {
    console.log(editValues
     )
    props.setOpen(false);
  };

  const handleChangeValues = value =>{
    setEditValues(prevValues => ({
      ...prevValues,
    [value.target.id]: value.target.value
    }))
  }
 


  return (
    <div>
      
      <h1>Caixa de dialogo</h1>
    </div>
  );
}