const express = require("express");

const { addCliente, deleteCliente, getCliente, updateCliente } = require("../controllers/cliente.js");

const router = express.Router();

router.get("/getClientes", getCliente);

router.post("/registerCliente", addCliente);

router.put("/editarCliente", updateCliente);

router.delete("/deleteCliente/:id", deleteCliente);

module.exports = router;
