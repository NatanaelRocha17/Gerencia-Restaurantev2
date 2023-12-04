import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Busca from "./../../search/Busca";
import styles from "./Estoques.module.css";
import ExibirDadosEstoque from "./ExibirDadosEstoque";
import MenuLateral from "./MenuLateral";

function Estoques() {
  const [produtosEstoque, setProdutosEstoque] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [startIndex, setStartIndex] = useState(0);

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

        {produtosExibidos.map((produto) => (
          <ExibirDadosEstoque
            key={produto.idestoque}
            id={produto.idestoque}
            dados={produto}
            listDados={produtosEstoque}
            setListDados={setProdutosEstoque}
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
    <>
      <Menu />
      <div className={styles.exibicao}>
        <div className={styles.menu}>
          <MenuLateral />
        </div>
        <div className={styles.produtos}>
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
      </div>
    </>
  );
}

export default Estoques;
