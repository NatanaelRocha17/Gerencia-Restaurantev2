// Rotas.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Container from "./components/layout/Container";

import Produtos from "./components/modulos/Produto/Produtos";
import CadastrarProduto from "./components/modulos/Produto/CadastrarProduto"
import Estoques from "./components/modulos/Estoque/Estoques";
import CadastrarEstoque from "./components/modulos/Estoque/cadastrarEstoque";

/*
import Container from "./components/layout/Container";
import CadastrarProduto from "./components/cadastro/cadastrarProduto"

import Produto from "./components/Produto/Produto";
import ProdutoEdicao from "./components/Produto/ProdutoEdicao";
import CadastrarEstoque from "./components/cadastro/cadastrarEstoque";
import Estoque from "./components/Estoque/Estoque";
import EstoqueEdicao from "./components/Estoque/EstoqueEdicao";*/

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
