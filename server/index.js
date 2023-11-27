const useRoutesProdutos = require("./routes/produtos.js");
const useRoutesEstoques = require("./routes/estoques.js");
const useRoutesFornecedor = require("./routes/fornecedores.js")
const useRoutesClientes = require("./routes/clientes.js");
const useRoutesRefeicao = require("./routes/refeicoes.js");

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(express.json()); // Middleware para analisar o corpo da solicitação JSON
app.use(cors());

app.use(cors()); // Chame a função cors aqui
app.use(express.json());
//Banco de dados tabela Produto

app.use("/", useRoutesProdutos)
app.use("/", useRoutesEstoques)
app.use("/", useRoutesFornecedor)
app.use("/", useRoutesClientes); 
app.use("/", useRoutesRefeicao); 

app.listen(3002, () => {
  console.log("Iniciando servidor na porta 3002");
});
