import React, { useState } from "react";
import FormDialog from "./modulos/Produto/dialog";


import styles from "./ExibirDados.module.css";

function ExibirDados(props) {
  // Function to format the date
  console.log("hey")
  console.log(props)
  const formatData = (date) => {
    if (date) {
      return new Date(date).toISOString().split("T")[0];
    }
    return "";
  };

  const [open, setOpen] = useState(false);

  const handleClickCard = () => {
    setOpen(true); // Abra o modal ao clicar no card
  };

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        nome={props.dados.nome} unidade={props.dados.unidade} id={props.dados.idproduto} medida={props.dados.medida} marca={props.dados.marca} fornecedor={props.dados.fornecedor} valor = {props.dados.valor} listDados={props.listDados}
        setListDados={props.setListDados}
      />
      <div className={styles.paiItem} >
        <div className={styles.item} onClick={() => handleClickCard()}>
        <div>
            <h5>{props.dados.nome}</h5>
          </div>
          <div>
            <h5>
               {props.dados.medida} {props.dados.unidade}
            </h5>
          </div>
          <div>
            <h5>{props.dados.marca}</h5>
          </div>
          <div>
            <h5>{props.dados.fornecedor}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExibirDados;
