import React, { useState } from "react";
import DialogClientes from "./dialogCliente";


import styles from "./ExibirDadosCliente.module.css";

function ExibirDadosClientes(props) {
  // Function to format the date
  

  const [open, setOpen] = useState(false);

  const handleClickCard = () => {
    setOpen(true); // Abra o modal ao clicar no card
  };

  return (
    <>
      <DialogClientes
        open={open}
        setOpen={setOpen}
        nome={props.dados.nome} telefone={props.dados.telefone} id={props.dados.idCliente} cpf={props.dados.cpf} email={props.dados.email} 
        listDados={props.listDados}
        setListDados={props.setListDados}
      />
      <div className={styles.paiItem} >
        <div className={styles.item} onClick={() => handleClickCard()}>
        <div>
            <h5>{props.dados.nome}</h5>
          </div>
          <div>
            <h5>
               {props.dados.telefone} 
            </h5>
          </div>
          <div>
            <h5>{props.dados.cpf}</h5>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default ExibirDadosClientes;
