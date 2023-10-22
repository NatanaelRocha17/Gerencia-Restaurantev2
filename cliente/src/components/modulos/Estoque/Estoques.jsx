import Menu from "./../../Menu";
import Busca from "./../../search/Busca";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./../Produto/Produtos.module.css";
import ExibirDadosEstoque from "./ExibirDadosEstoque";

function Estoques() {
  const [produtosEstoque, setProdutosEstoque] = useState([]);

  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    const getProdutosEstoque = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getProdutosEstoque");
        const savedData = response.data;
        console.log(savedData);
        setProdutosEstoque(savedData);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    getProdutosEstoque();
  }, []);

  const renderProdutosEstoque = () => {
    const produtosFiltrados = produtosEstoque.filter(
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
              <h5>Quantidade</h5>
            </div>
            <div>
              <h5>Lote</h5>
            </div>
            <div>
              <h5>Data de Validade</h5>
            </div>
          </div>
        </div>

        {produtosFiltrados.map((produto) => (
          <ExibirDadosEstoque
            key={produto.idestoque}
            id={produto.idestoque}
            dados={produto}
            listDados={produtosEstoque}
            setListDados={setProdutosEstoque}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Menu />
      <Busca
        rota="/cadastrarEstoque"
        onChange={(e) => setPesquisa(e.target.value)}
        tipo="Produto no Estoque"
      />
      {produtosEstoque.length === 0 ? (
        <h1>Não há produtos adicionados ao estoque</h1>
      ) : (
        renderProdutosEstoque()
      )}
    </div>
  );
}

export default Estoques;
