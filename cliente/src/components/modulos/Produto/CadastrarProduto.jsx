import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Input from "./../../form/Input";
import SubmitButton from "./../../form/SubmitButton";
import styles from "./cadastrarProduto.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CadastrarProduto() {
  const FormRef = useRef();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    valor: "",
    marca: "",
    medida: "",
    unidade: "kg",
    fornecedor: "",
  });

  useEffect(() => {
    // O useEffect monitora mudanças no estado formData
    console.log("Form data changed:", formData);
  }, [formData]);

  async function inputDados(e) {
    e.preventDefault();
    console.log(formData)

    axios
      .post("http://localhost:3002/registerProduto", formData)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data);
        setFormData({
          nome: "",
          valor: "",
          marca: "",
          medida: "",
          unidade: "kg",
          fornecedor: "",
        });
        navigate('/produtos');
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.warning(error.response.data.message);
        } else {
          toast.warning(error.response.data.message);
        }
      });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Menu />
      <div className={styles.product}>
        <div className={styles.formulario}>
          <h3>Cadastre o produto</h3>
          <p>
            Pode ser o que você utiliza nas refeições (verduras, mantimentos) ou
            os acompanhamentos (refrigerante, cerveja)
          </p>
          <form onSubmit={inputDados} ref={FormRef}>
            <div>
              <Input
                type="text"
                name="nome"
                id="nome"
                text="Nome do produto"
                placeholder="Digite o nome do produto"
                required
                value={formData.nome}
                onChange={handleInputChange}
              />

              <Input
                type="number"
                step="0.01"
                placeholder="10,00"
                name="valor"
                id="valor"
                text="Valor do produto R$:"
                value={formData.valor}
                onChange={handleInputChange}
              />

              <Input
                text="Marca do produto"
                type="text"
                name="marca"
                id="marca"
                placeholder="Digite a marca do produto"
                value={formData.marca}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="unidade">Selecione a medida:</label>

              <select
                id="unidade"
                name="unidade"
                className={styles.select}
                value={formData.unidade}
                onChange={handleInputChange}
              >
                <option value="kg">Quilogramas (kg)</option>
                <option value="g">Gramas (g)</option>
                <option value="L">Litros (L)</option>
                <option value="ml">Mililitros (ml)</option>
              </select>

              <Input
                type="number"
                step="0.01"
                text="Valor da unidade de medida"
                name="medida"
                id="medida"
                placeholder="Informe o valor da unidade de medida"
                value={formData.medida}
                onChange={handleInputChange}
              />

              <Input
                type="text"
                placeholder="Digite o nome do fornecedor"
                text="Fornecedor"
                name="fornecedor"
                id="fornecedor"
                value={formData.fornecedor}
                onChange={handleInputChange}
              />
            </div>

            <SubmitButton
              type="submit"
              text="Cadastrar"
              subm="Produto cadastrado!"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default CadastrarProduto;
