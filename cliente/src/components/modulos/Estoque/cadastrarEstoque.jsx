import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Menu from "./../../../Menu";
import Input from "../../form/Input";
import styles from "./cadastrarEstoque.module.css";
import SubmitButton from "../../form/SubmitButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CadastrarEstoque() {
  const navigate = useNavigate();
  const formRef = useRef(); // Crie um ref para o formulário
  const [formData, setFormData] = useState({
    idproduto: "",
    quantidade: "",
    lote: "",
    dataValidade: "",
  });
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/getProdutos").then((response) => {
      console.log("response");
      console.log(response);
      setProdutos(response.data);
    });
  }, []);

  function inputDados(e) {
    e.preventDefault();
    console.log(formData.idproduto);
    axios
      .post("http://localhost:3002/adicionarProdutoEstoque", {
        idProduto: parseInt(formData.idproduto),
        quantidade: formData.quantidade,
        lote: formData.lote,
        dataValidade: formData.dataValidade,
      })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data);
        setFormData({
          idProduto: "",
          quantidade: "",
          lote: "",
          dataValidade: "",
        });
        navigate("/estoque");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.warning(error.response.data);
        } else {
          toast.warning(error.response.data);
        }
      });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Menu />
      <div className={styles.product}>
        <div className={styles.formulario}>
          <div>
            <h1>Cadastrar Produto no Estoque</h1>
            <p>
              Informe o produto e preencha os dados desse lote no qual você
              comprou
            </p>
          </div>

          <form onSubmit={inputDados} ref={formRef}>
            <label htmlFor="">Escolha o produto</label>
            <select
              id="idproduto"
              name="idproduto"
              className={styles.select}
              value={formData.idproduto}
              onChange={handleInputChange}
            >
              <option value="">Selecione um produto</option>
              {produtos.map((iten) => (
                <option
                  className={styles.option}
                  key={iten.idproduto}
                  value={iten.idproduto}
                >
                  {iten.nome} - {iten.medida}
                  {iten.unidade} - {iten.marca} - {iten.fornecedor}
                </option>
              ))}
            </select>

            <Input
              className={styles.input}
              name="quantidade"
              text="Informe a quantidade do produto"
              type="number"
              placeholder="Quantidade de produtos"
              value={formData.quantidade}
              onChange={handleInputChange}
            />

            <Input
              className={styles.input}
              name="lote"
              text="Informe o número do lote"
              type="text"
              placeholder="Número de Lote"
              value={formData.lote}
              onChange={handleInputChange}
            />
            <Input
              className={styles.input}
              name="dataValidade"
              text="Informe a data de validade dos produtos desse lote"
              type="date"
              placeholder="Data de Validade"
              value={formData.dataValidade}
              onChange={handleInputChange}
            />

            <SubmitButton type="submit" text="Cadastrar" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastrarEstoque;
