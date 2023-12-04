import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Menu from "./../../Menu";
import Input from "./../../form/Input";
import SubmitButton from "./../../form/SubmitButton";
import styles from "./cadastrarFornecedor.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
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
    if (!formData.razaoSocial || !formData.email || !formData.telefone) {
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


  const handleCnpjMask = (value) => {
    // Limpa o valor removendo caracteres não numéricos
    const cleanedValue = value.replace(/\D/g, '');
  
    // Aplica a máscara
    const cnpjWithMask = cleanedValue.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  
    return cnpjWithMask;
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
                text="Razão social *"
                placeholder="Fornecedor"
                requerido={true}
                value={formData.razaoSocial}
                onChange={handleInputChange}
              />

              <Input
                type="tel"
                placeholder="77 99999-9999"
                name="telefone"
                id="telefone"
                requerido={true}
                text="Contato do fornecedor *"
                value={formData.telefone}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.inputs}>
           
<Input
  type="text"
  name="cnpj"
  id="cnpj"
  text="Informe o CNPJ"
  
  maxLength={14}
  placeholder="00.000.000/0000-00"
  value={handleCnpjMask(formData.cnpj)}
  onChange={(e) => {
    const formattedCnpj = handleCnpjMask(e.target.value);
    setFormData({ ...formData, cnpj: formattedCnpj });
  }}
  required={false}
/>
              <Input
                type="email"
                text="Endereço de e-mail *"
                name="email"
                id="email"
                requerido={true}
                placeholder="fornecedor@teste.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div id="andress">
              <div className={styles.inputs}>
                <div>
                  <label htmlFor="cep">CEP *:</label>
                  <input
                    type="text"
                    id="cep"
                    placeholder="0000000"
                    name="cep"
                    required
                    value={formData.cep}
                    onChange={handleInputChange}
                    maxLength="8"
                  />
                </div>
                <div>
                  <label htmlFor="logradouro">Logradouro *:</label>
                  <input
                    type="text"
                    id="logradouro"
                    required
                    placeholder="Rua das oliveiras"
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
                    placeholder="355"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles.inputs}>
                <div>
                  <label htmlFor="bairro">Bairro *:</label>
                  <input
                    type="text"
                    id="bairro"
                    placeholder="Centro"
                    required
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="cidade">Cidade *:</label>
                  <input
                    type="text"
                    id="cidade"
                    required
                    name="cidade"
                    placeholder="Vitória da Conquista"
                    value={formData.cidade}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="uf">UF *:</label>
                  <input
                    type="text"
                    id="uf"
                    required
                    placeholder="BA"
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
