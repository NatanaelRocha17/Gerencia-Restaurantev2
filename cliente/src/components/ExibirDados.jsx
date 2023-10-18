import React from "react";

import styles from "./ExibirDados.module.css"; // Importe o arquivo CSS para estilização
import FormDialog from "./dialog";

function ExibirDados(props) {

const [open, setOpen] = React.useState(false)

const handleClickCard = () =>{
  setOpen(true);
 }  
 console.log(props.dados.idproduto)
 return (
    <>
    <FormDialog open={open} setOpen={setOpen} nome={props.dados.nome} unidade={props.dados.unidade} id={props.dados.idproduto} medida={props.dados.medida} marca={props.dados.marca} fornecedor={props.dados.fornecedor} valor = {props.dados.valor}/>
    <div className={styles.paiItem} onClick={() => handleClickCard()}>
        <div className={styles.item}>
          <div>
            <h4>{props.dados.nome}</h4>
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
