import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Menu from "./../../../Menu";
import Select from "./../../form/Select";
import Input from "../../form/Input";
import styles from "./cadastrarEstoque.module.css";
import SubmitButton from "../../form/SubmitButton";

function CadastrarEstoque() {
  const formRef = useRef(); // Crie um ref para o formulário
  const [produtos, setProdutos] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3002/getProdutos").then((response) => {
      console.log(response);
      setProdutos(response.data);
    });
  }, []);

  function inputDados(e){
    e.preventDefault()
    const select = formRef.current.querySelector(
      "select[name='produto']"
    ).value; // Pega o valor do select (ID)
    const quantidadeInput = formRef.current.querySelector(
      "input[name='quantidade']"
    );
    const loteInput = formRef.current.querySelector("input[name='lote']");
    const dataValidadeInput = formRef.current.querySelector(
      "input[name='dataValidade']"
    );


    axios.post("http://localhost:3002/adicionarProdutoEstoque",{
      idProduto: parseInt(select),
      quantidade: quantidadeInput.value,
      lote: loteInput.value,
      dataValidade: dataValidadeInput.value
    })
  
  }

  return (
    <div>
      <Menu />
      <div className={styles.product}>
        <div className={styles.formulario}>
          <div>
            <h1>Cadastrar Produto no Estoque</h1>
            <p>
              Informe o produto e preencha os dados desse lote no qual você
              comprou
            </p>
          </div>

          <form onSubmit={inputDados} ref={formRef}>
            <Select
              name="produto"
              text="Selecione um produto"
              itens={produtos || []}
            />

            <Input
              className={styles.input}
              name="quantidade"
              text="Informe a quantidade do produto"
              type="number"
              placeholder="Quantidade de produtos"
            />

            <Input
              className={styles.input}
              name="lote"
              text="Informe o número do lote"
              type="number"
              placeholder="Número de Lote"
            />
            <Input
              className={styles.input}
              name="dataValidade"
              text="Informe a data de validade dos produtos desse lote"
              type="date"
              placeholder="Data de Validade"
            />

            <SubmitButton type="submit" text="Cadastrar" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastrarEstoque;
