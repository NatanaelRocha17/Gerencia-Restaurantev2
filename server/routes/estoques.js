

const { getEstoque, uptadeEstoque, deleteEstoque, addEstoque } = require("../controllers/estoque.js");
;

const router = require('express').Router();

router.get("/getProdutosEstoque", getEstoque)

router.post("/adicionarProdutoEstoque", addEstoque)

router.put("/editarProdutoEstoque", uptadeEstoque)

router.delete("/deleteProdutoEstoque/:id", deleteEstoque)


module.exports = router;
