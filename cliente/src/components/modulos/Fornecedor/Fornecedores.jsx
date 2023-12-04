import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Busca from "./../../search/Busca";
import ExibirDadosFornecedor from "./ExibirDadosFornecedor";
import styles from "./Fornecedores.module.css";

function Fornecedores() {
  const [fornecedores, setFornecedor] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const getFornecedor = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getFornecedor");
        const savedData = response.data;
        console.log(savedData);
        setFornecedor(savedData);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    getFornecedor();
  }, []);

  const renderFornecedor = () => {
    const fornecedorFiltrados = fornecedores.filter(
      (fornecedor) =>
        fornecedor.razao_social &&
        fornecedor.razao_social.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const endIndex = startIndex + 10;
    const fornecedoresExibidos = fornecedorFiltrados.slice(startIndex, endIndex);

    if (fornecedoresExibidos.length === 0) {
      return <h1>Nenhum fornecedor cadastrado</h1>;
    }

    return (
      <div>
        <div className={styles.paiItem}>
          <div className={styles.item}>
            <div>
              <h5>Razão Social</h5>
            </div>
            <div>
              <h5>CNPJ</h5>
            </div>
            <div>
              <h5>Telefone</h5>
            </div>
          </div>
        </div>

        {fornecedoresExibidos.map((fornecedor) => (
          <ExibirDadosFornecedor
            key={fornecedor.id}
            id={fornecedor.id}
            dados={fornecedor}
            listDados={fornecedores}
            setListDados={setFornecedor}
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
            {fornecedorFiltrados.length > endIndex && (
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
        rota="/cadastrarFornecedor"
        onChange={(e) => setPesquisa(e.target.value)}
        tipo="Fornecedor"
      />
      {fornecedores.length === 0 ? (
        <>
          <h2>Nenhum fornecedor cadastrado</h2>
          
        </>
      ) : (
        renderFornecedor()
      )}
    </div>
  );
}

export default Fornecedores;
