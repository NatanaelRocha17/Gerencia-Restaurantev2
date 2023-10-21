import React, { useState, useEffect } from "react";

import Menu from "./../../Menu";
import Busca from "./../../search/Busca";
import ExibirDados from "./../../ExibirDados";

import styles from "./Produtos.module.css";
import axios from "axios";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  //assim que for montado no dom o useEffect entra em ação

  const getProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3002/getProdutos");
      console.log(response);
      setProdutos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProdutos();
  }, [setProdutos]);

  
  if (produtos.length === 0) {
    return <h1>Nenhum produto encontrado</h1>;
  }


  return (
    <>
      <Menu />
      <Busca
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        rota={"/cadastrarProduto"}
        tipo={"Produto"}
      />

      
<div className={styles.paiItem}>
          <div className={styles.item}>
            <div>
              <h5>Nome do produto</h5>
            </div>
            <div>
              <h5>Medida</h5>
            </div>
            <div>
              <h5>Marca</h5>
            </div>
            <div>
              <h5>Fornecedor</h5>
            </div>
          </div>
        </div>
     {
        
        produtos
          .filter((produto) =>
            produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
          )
          .map((produto) => (
            <ExibirDados
              key={produto.idproduto}
              dados={produto}
              listDados={produtos}
              setListDados={setProdutos}
            />
          ))
      }
    </>
  );
};

export default Produtos;
