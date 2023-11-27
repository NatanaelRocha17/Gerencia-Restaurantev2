const { db } = require("../db.js");

module.exports.addProduto = (req, res) => {
  const { nome, valor, marca, unidade, medida, fornecedor } = req.body;
  console.log(unidade + "--> " + medida);
  // Verifica se o produto já está cadastrado
  const SQL2 =
    "SELECT * FROM produtos WHERE nome = ? AND marca = ? AND unidade = ? AND medida = ? AND fornecedor = ?";
  const result2 = db.query(
    SQL2,
    [nome, marca, unidade, medida, fornecedor],
    (err, result2) => {
      console.log(result2);
      if (result2.length > 0) {
        // O produto já está cadastrado

        const errMessage = "O produto já está cadastrado.";
        console.log(errMessage);
        return res.status(400).json({ message: errMessage });
      } else {
        // O produto não está cadastrado
        const SQL =
          "INSERT INTO produtos (nome, valor, marca, unidade, medida, fornecedor) VALUES (?,?,?,?,?,?)";

        db.query(
          SQL,
          [nome, valor, marca, unidade, medida, fornecedor],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json("Erro ao criar o produto.");
            }

            return res.status(200).json("Produto criado com sucesso.");
          }
        );
      }
    }
  );
};

module.exports.getProduto = (req, res) => {
  let SQL = "SELECT * FROM produtos";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
};

module.exports.uptadeProduto = (req, res) => {
  const { nome } = req.body;
  const { valor } = req.body;
  const { marca } = req.body;
  const { medida } = req.body;
  const { unidade } = req.body;
  const { fornecedor } = req.body;
  const { idproduto } = req.body;

  const SQL2 =
    "SELECT * FROM produtos WHERE nome = ? AND marca = ? AND unidade = ? AND medida = ? AND fornecedor = ?";
  const result2 = db.query(
    SQL2,
    [nome, marca, unidade, medida, fornecedor],
    (err, result2) => {
      console.log(result2);
      if (result2.length > 0) {
        // O produto já está cadastrado

        const errMessage = "O produto já está cadastrado.";
        console.log(errMessage);
        return res.status(400).json("O produto já está cadastrado.");
      } else {
        let SQL =
          "UPDATE produtos SET nome = ?, valor = ?, marca= ?, unidade = ?, medida = ?, fornecedor = ? WHERE idproduto = ?";

        db.query(
          SQL,
          [nome, valor, marca, unidade, medida, fornecedor, idproduto],
          (err, result) => {
            if (err) console.log(err);
            else return res.status(200).json("Produto editado com sucesso.");
          }
        );
      }
    }
  );
};

module.exports.deleteProduto = (req, res) => {
  const { id } = req.params;
  let SQL = "DELETE FROM produtos WHERE idproduto = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else return res.status(200).json("Produto deletado com sucesso.");
  });
};
