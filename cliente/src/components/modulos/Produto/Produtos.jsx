import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Busca from "./../../search/Busca";
import ExibirDados from "./ExibirDados";
import styles from "./../Produto/Produtos.module.css";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    const getProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getProdutos");
        const savedData = response.data;
        console.log(savedData);
        setProdutos(savedData);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    getProdutos();
  }, []);

  const renderProdutos = () => {
    const produtosFiltrados = produtos.filter(
      (produto) =>
        produto.nome &&
        produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    if (produtosFiltrados.length === 0) {
      return <h1>Nenhum produto encontrado</h1>;
    }

    return (
      <div>
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

        {produtosFiltrados.map((produto) => (
          <ExibirDados
            key={produto.idproduto}
            id={produto.idproduto}
            dados={produto}
            listDados={produtos}
            setListDados={setProdutos}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Menu />
      <Busca
        rota="/cadastrarProduto"
        onChange={(e) => setPesquisa(e.target.value)}
        tipo="Produto"
      />
      {produtos.length === 0 ? (
        <h1>Nenhum produto encontrado</h1>
      ) : (
        renderProdutos()
      )}
    </div>
  );
};

export default Produtos;
