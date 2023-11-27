import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Input from "./../../form/Input";
import SubmitButton from "./../../form/SubmitButton";
import styles from "./cadastrarFornecedor.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CadastrarFornecedor() {
  const FormRef = useRef();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    razaoSocial: "",
    email: "",
    telefone: "",
    cnpj: "",
    logradouro: "",
    cep: "",
    numero: "",
    cidade: "",
    uf: "",
    bairro: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Form data changed:", formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Verificar se os campos obrigatórios estão preenchidos
    if (!formData.razaoSocial || !formData.email || !formData.telefone || !formData.cnpj) {
      toast.warning("Preencha todos os campos obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/registerFornecedor",
        formData
      );
      console.log(response.data);
      toast.success(response.data);
      setFormData({
        razaoSocial: "",
        email: "",
        telefone: "",
        cnpj: "",
        logradouro: "",
        cep: "",
        numero: "",
        cidade: "",
        bairro: "",
        uf: "",
      });
      navigate("/fornecedores");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        toast.warning(error.response.data.message);
      } else {
        toast.warning("Erro ao cadastrar fornecedor.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Verifica se o campo pertence ao endereço
    if (["cep", "logradouro", "numero", "bairro", "cidade", "uf"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <>
      <Menu className={styles.menu} />
      <div className={styles.product}>
        <div className={styles.formulario}>
          <h3>Cadastre um Fornecedor</h3>
          <form onSubmit={handleSubmit} ref={FormRef}>
            <div className={styles.inputs}>
              <Input
                type="text"
                name="razaoSocial"
                id="razaoSocial"
                text="Razão social"
                placeholder="Digite a Razão social"
                required
                value={formData.razaoSocial}
                onChange={handleInputChange}
              />

              <Input
                type="tel"
                placeholder="77 99999-9999"
                name="telefone"
                id="telefone"
                text="Contato do fornecedor"
                value={formData.telefone}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputs}>
              <Input
                text="Informe o CNPJ"
                type="text"
                name="cnpj"
                id="cnpj"
                placeholder="Digite o CNPJ da empresa"
                value={formData.cnpj}
                onChange={handleInputChange}
                requerido={false}
              />
              <Input
                type="email"
                text="Endereço de e-mail"
                name="email"
                id="email"
                placeholder="Endereço de e-mail do fornecedor"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div id="andress">
              <div className={styles.inputs}>
                <div>
                  <label htmlFor="cep">CEP:</label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                    maxLength="8"
                  />
                </div>
                <div>
                  <label htmlFor="logradouro">Logradouro:</label>
                  <input
                    type="text"
                    id="logradouro"
                    name="logradouro"
                    value={formData.logradouro}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="numero">Nº:</label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles.inputs}>
                <div>
                  <label htmlFor="bairro">Bairro:</label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="cidade">Cidade:</label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="uf">UF:</label>
                  <input
                    type="text"
                    id="uf"
                    name="uf"
                    value={formData.uf}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <SubmitButton
              type="submit"
              text={loading ? "Cadastrando..." : "Cadastrar"}
              subm="Produto cadastrado!"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default CadastrarFornecedor;
