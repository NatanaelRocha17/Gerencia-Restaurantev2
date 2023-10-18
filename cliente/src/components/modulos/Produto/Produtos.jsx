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

  return (
    <>
      <Menu />
      <Busca
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        rota={"/cadastrarProduto"}
        tipo={"Produto"}
      />

      
      {produtos.length === 0 ? (
        <h1>Nenhum produto cadastrado</h1>
      ) : (
        
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
      )}
    </>
  );
};

export default Produtos;
