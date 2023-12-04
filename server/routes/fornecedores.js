const express = require("express");

const { addFornecedor, deleteFornecedor, getFornecedor, updateFornecedor } = require("../controllers/fornecedor.js");
;

const router = require('express').Router();

router.get("/getFornecedor", getFornecedor)



router.post("/registerFornecedor", addFornecedor)

router.put("/editarFornecedor", updateFornecedor)

router.delete("/deleteFornecedor/:id", deleteFornecedor)


module.exports = router;
