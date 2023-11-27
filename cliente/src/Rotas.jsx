// Rotas.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Container from "./components/layout/Container";

import Produtos from "./components/modulos/Produto/Produtos";
import CadastrarProduto from "./components/modulos/Produto/CadastrarProduto"
import Estoques from "./components/modulos/Estoque/Estoques";
import CadastrarEstoque from "./components/modulos/Estoque/cadastrarEstoque";
import Fornecedores from "./components/modulos/Fornecedor/Fornecedores";
import CadastrarFornecedor from "./components/modulos/Fornecedor/cadastrarFornecedor";
import Clientes from "./components/modulos/Cliente/Clientes";
import CadastrarCliente from "./components/modulos/Cliente/CadastrarCliente";
import { CadastrarRefeicao} from "./components/modulos/Refeicao/CadastrarRefeicao";
import Refeicoes from "./components/modulos/Refeicao/Refeicoes";


function Rotas() {
  return (
    <Router>
      <Container customClass="min-height">
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/cadastrarProduto" element={<CadastrarProduto/>} />
        <Route path="/estoque" element={<Estoques />} />
        <Route path="/cadastrarEstoque" element={<CadastrarEstoque/>} />
        <Route path="/fornecedores" element={<Fornecedores/>}/>
        <Route path="/cadastrarFornecedor" element={<CadastrarFornecedor/>}/>
        <Route path="/clientes" element={<Clientes />} />
          <Route path="/cadastrarCliente" element={<CadastrarCliente />} />
          
          <Route path="/refeicoes" element={<Refeicoes />} />
          <Route path="/cadastrarRefeicao" element={<CadastrarRefeicao />} />
        
          {/*  <Route path="/produto/edit/:id" element={<ProdutoEdicao/>}/>
          <Route path="/estoque" element={<Estoques />} />
          <Route path="/cadastrarEstoque" element={<CadastrarEstoque/>} />
          <Route path="/estoqueProduto/:id" element={<Estoque/>} />
  <Route path="/estoqueProduto/edit/:id" element={<EstoqueEdicao/>} />*/}
        </Routes>
      </Container>
    </Router>
  );
}

export default Rotas;
