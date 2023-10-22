import React from "react";
import FormDialogEstoque from "./../Estoque/dialogEstoque";
import { Link } from "react-router-dom";

import styles from "./../../ExibirDados.module.css";

function ExibirDadosEstoque(props) {
  
// Function to format the date
const formatData = (date) => {
  if (date) {
    return new Date(date).toISOString().split("T")[0];

  }
  return "";
};
const [open, setOpen] = React.useState(false)

const handleClickCard = () =>{
  setOpen(true);
 }  


  return (
    <>
      <FormDialogEstoque open={open} setOpen={setOpen} nome={props.dados.nome} lote={props.dados.lote} dataValidade={props.dados.dataValidade} quantidade={props.dados.quantidade} idestoque={props.dados.idestoque} idproduto={props.dados.idproduto}  listDados={props.listDados} setListDados={props.setListDados}/>
      <div className={styles.paiItem} onClick={() => handleClickCard()}>
        <div className={styles.item}>
        <div>
          <h5>{props.dados.nome}</h5>
        </div>
        <div>
          <h5>{props.dados.quantidade}</h5>
        </div>
        <div>
          <h5>{props.dados.lote}</h5>
        </div>
        <div>
          <h5>{formatData(props.dados.dataValidade)}</h5>
        </div>
        </div>
      </div>
      </>
  );
}

export default ExibirDadosEstoque;
