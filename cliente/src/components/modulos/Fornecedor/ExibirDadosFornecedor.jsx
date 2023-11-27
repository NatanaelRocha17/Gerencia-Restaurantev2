import React from "react";
import DialogFornecedor from "./../Fornecedor/dialogFornecedor";
import { Link } from "react-router-dom";

import styles from "./ExibirDadosFornecedor.module.css";

function ExibirDadosFornecedor(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickCard = () => {
    setOpen(true);
  };

  console.log( props.dados.enderecos[0].cidade)

  return (
    <>
      
      <DialogFornecedor open={open} setOpen={setOpen} dados={props.dados}  listDados={props.listDados}
            setListDados={props.setListDados}/>
      <div className={styles.paiItem} onClick={() => handleClickCard()}>
        <div className={styles.item}>
          <div>
            <h5>{props.dados.razao_social}</h5>
          </div>
          <div>
            <h5>{props.dados.cnpj}</h5>
          </div>
          <div>
            <h5>{props.dados.telefone}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExibirDadosFornecedor;
