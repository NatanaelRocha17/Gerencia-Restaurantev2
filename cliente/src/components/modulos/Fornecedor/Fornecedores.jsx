import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Busca from "./../../search/Busca";
import ExibirDadosFornecedor from "./ExibirDadosFornecedor"
import styles from "./Fornecedores.module.css"

function Fornecedores(){

  const [fornecedores, setFornecedor] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    const getFornecedor = async () => {
      try {
        const response = await axios.get("http://localhost:3002/getFornecedor");
        const savedData = response.data;
        console.log(savedData)
        setFornecedor(savedData);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    getFornecedor();
  }, []);

  console.log(fornecedores)
  const renderFornecedor= () => {
    const fornecedorFiltrados = fornecedores.filter(
      (fornecedor) =>
        fornecedor.razao_social &&
        fornecedor.razao_social.toLowerCase().includes(pesquisa.toLowerCase())
    );

    if (fornecedorFiltrados.length === 0) {
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

        {fornecedorFiltrados.map((fornecedor) => (
          <ExibirDadosFornecedor
            key={fornecedor.id}
            id={fornecedor.id}
            dados={fornecedor}
            listDados={fornecedores}
            setListDados={setFornecedor}
          />
        ))}
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
        <p>Cadastre um fornecedor</p>
        </>
      ) : (
        renderFornecedor()
      )}
    </div>
  );
};




export default Fornecedores;