const express = require("express");

const { addRefeicao, deleteRefeicao, getRefeicao, uptadeRefeicao } = require("../controllers/refeicao.js");
;

const router = require('express').Router();

router.get("/getRefeicoes", getRefeicao)

router.post("/registerRefeicao", addRefeicao)

router.put("/editarRefeicao", uptadeRefeicao)

router.delete("/deleteRefeicao/:id", deleteRefeicao)


module.exports = router;
