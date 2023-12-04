import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Busca from "./../../search/Busca";
import ExibirDados from "./ExibirDados";
import styles from "./../Produto/Produtos.module.css";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [fornecedores, setFornecedores] = useState([]);

  console.log("produtos " + produtos)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [produtosResponse, fornecedoresResponse] = await Promise.all([
          axios.get("http://localhost:3002/getProdutos"),
          axios.get("http://localhost:3002/getFornecedor"),
        ]);

        const produtosData = produtosResponse.data;
        const fornecedoresData = fornecedoresResponse.data;
        console.log("Fornecedores:", fornecedoresData);

        // Aqui você pode realizar a lógica para combinar ou processar os dados, se necessário.

        // Exemplo de combinação simples (assumindo que há uma propriedade 'idfornecedor' em produtos que corresponde a 'id' em fornecedores):
        const produtosComFornecedores = produtosData.map((produto) => {
          const fornecedorCorrespondente = fornecedoresData.find(
            (fornecedor) => fornecedor.id === produto.idfornecedor
          );
          return {
            ...produto,
            fornecedor: fornecedorCorrespondente || { razao_social: "Sem fornecedor" },
          };

        });

        console.log("produtos com fornecedor")
        console.log(produtosComFornecedores);

        setProdutos(produtosComFornecedores);
        setFornecedores(fornecedoresData);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    fetchData();
  }, []);
  


  const renderProdutos = () => {
    const produtosFiltrados = produtos.filter(
      (produto) =>
        produto.nome &&
        produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
      
    const endIndex = startIndex + 10;
    const produtosExibidos = produtosFiltrados.slice(startIndex, endIndex);

    if (produtosExibidos.length === 0) {
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

        {produtosExibidos.map((produto) => (
          <ExibirDados
            key={produto.idproduto}
            id={produto.idproduto}
            dados={produto}
            listDados={produtos}
            setListDados={setProdutos}
          />
        ))}

        <div className={styles.navegacao}>
          <div className={styles.anterior}>
            {startIndex > 0 && (
              <button
                onClick={() => setStartIndex(Math.max(startIndex - 10, 0))}
              >
                Anteriores
              </button>
            )}
          </div>
          <div className={styles.proximo}>
            {produtosFiltrados.length > endIndex && (
              <button onClick={() => setStartIndex(startIndex + 10)}>
                Próximos
              </button>
            )}
          </div>
        </div>
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
