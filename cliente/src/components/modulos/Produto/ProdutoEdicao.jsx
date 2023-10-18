import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProdutoEdicao.module.css";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../Menu";

function ProdutoEdicao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: "",
    valorProduto: "0", // Defina o valor inicial como uma string
    marcaProduto: "",
    unidadeMedida: "kg",
    valorUnidadeMedida: "0", // Defina o valor inicial como uma string
    fornecedor: "",
  });

  useEffect(() => {
    const getProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/projects/${id}`);
        const produtoData = response.data;
        setProduto(produtoData);
      } catch (error) {
        console.error("Erro ao recuperar os dados:", error);
      }
    };

    getProduto();
  }, [id]);

  const atualizarProduto = async () => {
    try {
     
      
      await axios.put(`http://localhost:5000/projects/${id}`, produto);

      navigate(`/produto/:${id}`);
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduto({
      ...produto,
      [name]: value,
    });
  };

  return (
    <>
      <Menu />
      <div className={styles.product}>
        <div className={styles.formulario}>
          <div className={styles.caixa}>
            <h2>Editar Produto</h2>
            <form onSubmit={atualizarProduto}>
              <div>
                <Input
                  type="text"
                  name="nome"
                  id="nome"
                  text="Nome do produto"
                  placeholder="Digite o nome do produto"
                  value={produto.nome}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  type="number"
                  placeholder="10,00"
                  name="valorProduto"
                  id="valorProduto"
                  text="Valor do produto R$:"
                  value={produto.valorProduto}
                  onChange={handleInputChange}
                />

                <Input
                  text="Marca do produto"
                  type="text"
                  name="marcaProduto"
                  id="marcaProduto"
                  placeholder="Digite a marca do produto"
                  value={produto.marcaProduto}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="medida">Selecione a medida:</label>
                <select
                  id="medida"
                  name="unidadeMedida"
                  value={produto.unidadeMedida}
                  onChange={handleInputChange}
                >
                  <option value="kg">Quilogramas (kg)</option>
                  <option value="g">Gramas (g)</option>
                  <option value="litros">Litros</option>
                  <option value="ml">Mililitros (ml)</option>
                </select>

                <Input
                  type="number"
                  text="Valor da unidade de medida"
                  name="valorUnidadeMedida"
                  id="valorUnidadeMedida"
                  placeholder="Informe o valor da unidade de medida"
                  value={produto.valorUnidadeMedida}
                  onChange={handleInputChange}
                />

                <Input
                  type="text"
                  placeholder="Digite o nome do fornecedor"
                  text="Fornecedor"
                  name="fornecedor"
                  id="fornecedor"
                  value={produto.fornecedor}
                  onChange={handleInputChange}
                />
              </div>

              <SubmitButton type="submit" text="Salvar" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProdutoEdicao;
