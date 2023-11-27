import React, { useState } from "react";
import RefeicaoDialog from "./dialog";
import styles from "./ExibirDados.module.css";

function ExibirDados(props) {
  const [open, setOpen] = useState(false);

  const handleClickCard = () => {
    setOpen(true);
  };

  return (
    <>
      <RefeicaoDialog
        open={open}
        setOpen={setOpen}
        nome={props.dados.nome}
        valor={props.dados.valor}
        idRefeicao={props.dados.idRefeicao}  listDados={props.listDados} setListDados={props.setListDados}/>
      <div className={styles.paiItem}>
        <div className={styles.item} onClick={() => handleClickCard()}>
          <div>
            <h5>{props.dados.nome}</h5>
          </div>
          <div>
            <h5>R$ {props.dados.valor}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExibirDados;
