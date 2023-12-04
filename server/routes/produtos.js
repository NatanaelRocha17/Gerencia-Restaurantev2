const express = require("express");

const { addProduto, deleteProduto, getProduto, uptadeProduto, getFornecedorById } = require("../controllers/produto.js");
;

const router = require('express').Router();

router.get("/getProdutos", getProduto)

router.post("/registerProduto", addProduto)

router.get("/getFornecedores/id", getFornecedorById)

router.put("/editarProduto", uptadeProduto)

router.delete("/delete/:id", deleteProduto)


module.exports = router;
