const { db } = require("../db.js");

module.exports.addCliente = (req, res) => {
  const { nome, telefone, cpf, email } = req.body;

  // Verifica se o cliente já está cadastrado
  const SQL2 = "SELECT * FROM clientes WHERE cpf = ?";
  const result2 = db.query(SQL2, [cpf], (err, result2) => {
    console.log(result2);
    if (result2.length > 0) {
      // O cliente já está cadastrado
      const errMessage = "O cliente já está cadastrado.";
      console.log(errMessage);
      return res.status(400).json({ message: errMessage });
    } else {
      // O cliente não está cadastrado
      const SQL =
        "INSERT INTO clientes (nome, telefone, cpf, email) VALUES (?,?,?,?)";

      db.query(SQL, [nome, telefone, cpf, email], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json("Erro ao criar o cliente.");
        }

        return res.status(200).json("Cliente criado com sucesso.");
      });
    }
  });
};

module.exports.getCliente = (req, res) => {
  let SQL = "SELECT * FROM clientes";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
};

module.exports.updateCliente = (req, res) => {
  const { nome, telefone, cpf, email, idCliente } = req.body;
  console.log("CPF " + cpf);
  console.log(idCliente);

  // Verifica se o cliente já está cadastrado
  const SQL2 =
    "SELECT * FROM clientes WHERE nome = ? AND telefone = ? AND email = ? AND cpf = ?";
  db.query(SQL2, [nome, telefone, email, cpf], (err, result2) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Erro no servidor ao verificar duplicatas.");
    }

    if (result2.length > 0) {
      // O cliente já está cadastrado
      const errMessage = "O cliente já está cadastrado.";
      console.log(errMessage);
      return res.status(400).json("O cliente já está cadastrado.");
    } else {
      // Verifica se o CPF já está cadastrado para outro cliente
      const SQL3 = "SELECT * FROM clientes WHERE cpf = ? AND idCliente != ?";
      db.query(SQL3, [cpf, idCliente], (err, result3) => {
        if (err) {
          console.log(err);
          return res.status(500).json("Erro no servidor ao verificar CPF duplicado.");
        }

        if (result3.length > 0) {
          // CPF já está cadastrado para outro cliente
          const errMessage = "CPF já está cadastrado para outro cliente.";
          console.log(errMessage);
          return res.status(400).json(errMessage);
        } else {
          // Atualiza o cliente mantendo o CPF inalterado
          const SQL =
            "UPDATE clientes SET nome = ?, telefone = ?, email = ?, cpf = ? WHERE idCliente = ?";
          
          db.query(
            SQL,
            [nome, telefone, email,cpf ,idCliente],
            (err, result) => {
              if (err) {
                console.log(err);
                return res.status(500).json("Erro ao editar o cliente.");
              }

              return res.status(200).json("Cliente editado com sucesso.");
            }
          );
        }
      });
    }
  });
};


module.exports.deleteCliente = (req, res) => {
  
  const { id } = req.params;
  console.log("cego o id " + id)
  let SQL = "DELETE FROM clientes WHERE idCliente = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else return res.status(200).json("Cliente deletado com sucesso.");
  });
};
