import { useNavigate } from "react-router-dom";
import Menu from "../../Menu";
import Input from "../../form/Input"
import SubmitButton from "../../form/SubmitButton";
import styles from "./cadastrarProduto.module.css";
import React, { useEffect, useRef, useState} from "react";

//tentar usar esse com useState e useEffect
import axios from "axios";
function CadastrarProduto() {
  const FormRef = useRef()
  const navigate = useNavigate();

  async function inputDados(e) {
    e.preventDefault();
    const inputDescElements = Array.from(FormRef.current.querySelectorAll("input", "select"));
    const select = FormRef.current.querySelector("select[name='medida']").value;
    console.log(inputDescElements[0])
    const values = inputDescElements.map((element) => {
      return element.value;
    });
  

    axios.post("http://localhost:3002/registerProduto", {
      nome:values[0],
      valor:values[1],
      marca:values[2],
      unidade:select,
      medida: values[3],
      fornecedor:values[4]
      
      
    })
      .then(({response}) => {
       // toast.sucess(response);
      })
      .catch(({error}) => {
       // toast.err(error);
      });
      
      navigate('/produtos');
  }
  


  return (
    <>
      <Menu />
      <div className={styles.product}>
        <div className={styles.formulario}>
          <h1>Cadastre o produto</h1>
          <p>
            Pode ser o que você utiliza nas refeições (verduras, mantimentos) ou
            os acompanhamentos (refrigerante, cerveja)
          </p>
          <form onSubmit={inputDados} ref={FormRef}>

            <div>
            <Input
              type="text"
              name="nome"
              id="nome"
              text="Nome do produto"
              placeholder="Digite o nome do produto"
              required
              
            />

            <Input
              type="number"
              step="0.01"
              placeholder="10,00"
              name="valor"
              id="valor"
              text="Valor do produto R$:"
              
            />

            <Input
              text="Marca do produto"
              type="text"
              name="marca"
              id="marca"
              placeholder="Digite a marca do produto"
             
            />
            </div>
           <div>

           <label htmlFor="medida">Selecione a medida:</label>
            <select
              id="medida"
              name="medida"
             
            >
              <option value="kg">Quilogramas (kg)</option>
              <option value="g">Gramas (g)</option>
              <option value="litros">Litros (L)</option>
              <option value="ml">Mililitros (ml)</option>
      
            </select>

            <Input
              type="number"
              step="0.01"
              text="Valor da unidade de medida"
              name="valorUnidade"
              id="valorUnidade"
              placeholder="Informe o valor da unidade de medida"
             
            />

            <Input
              type="text"
              placeholder="Digite o nome do fornecedor"
              text="Fornecedor"
              name="fornecedor"
              id="fornecedor"
              
            />
           </div>

            <SubmitButton  type="submit" text="Cadastrar" subm="Produto cadastrado!"/>

          
          </form>
        </div>
        {/* Verificar se o botão fica nesta mesma posição */}
      </div>
    </>
  );
}

export default CadastrarProduto;
