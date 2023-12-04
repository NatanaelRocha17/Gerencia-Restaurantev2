import React, { useState, useEffect } from "react";
import FormDialog from "./dialog";
import axios from "axios";


import styles from "./ExibirDados.module.css";

function ExibirDados(props) {
  // Function to format the date
  

  const [open, setOpen] = useState(false);

  const handleClickCard = () => {
    setOpen(true); // Abra o modal ao clicar no card
  };

  console.log(props.dados.fornecedor.razao_social)

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        nome={props.dados.nome} unidade={props.dados.unidade} id={props.dados.idproduto} idfornecedor={props.dados.idfornecedor}  medida={props.dados.medida} marca={props.dados.marca} fornecedor={props.dados.fornecedor} valor = {props.dados.valor} listDados={props.listDados}
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
          <h5>{props.dados.marca === "" ? "Marca não cadastrada" : props.dados.marca}</h5>
          </div>
          <div>
            <h5>{props.dados.fornecedor.razao_social}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExibirDados;
