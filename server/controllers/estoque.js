const { db } = require("../db.js");

module.exports.addEstoque = (req, res) => {
  console.log("Caiu aqui");
  const { idProduto, quantidade, lote, dataValidade } = req.body;

  const SQL2 = "SELECT * FROM estoque WHERE idProduto = ? AND lote = ?";

  const result2 = db.query(SQL2, [idProduto, lote], (err, result2) => {
    console.log(result2);
    if (result2.length > 0) {
      // O produto já está cadastrado

      const errMessage = "O produto já está cadastrado.";
      console.log(errMessage);
      return res.status(400).json("O produto já está cadastrado.");
    } else {
      const SQL =
        "INSERT INTO estoque (idProduto, quantidade, lote, dataValidade) VALUES (?,?,?,?)";

      db.query(
        SQL,
        [idProduto, quantidade, lote, dataValidade],
        (err, result) => {
          if (err) console.log(err);
          return res
            .status(200)
            .json("Produto adicionado ao estoque com sucesso!");
        }
      );
    }
  });
};

module.exports.getEstoque = (req, res) => {
  let SQL =
    "SELECT * FROM produtos INNER JOIN estoque ON produtos.idproduto = estoque.idProduto";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
};

//atualizar

module.exports.uptadeEstoque = (req, res) => {
  const { quantidade } = req.body;
  const { dataValidade } = req.body;
  const { lote } = req.body;
  const { idestoque } = req.body;
  const { idproduto } = req.body;

  const SQL2 =
    "SELECT * FROM estoque WHERE idProduto = ? AND lote = ? AND quantidade = ? AND dataValidade = ?";

  const result2 = db.query(
    SQL2,
    [idproduto, lote, quantidade, dataValidade],
    (err, result2) => {
      console.log(result2);
      if (result2.length > 0) {
        // O produto já está cadastrado

        const errMessage = "O produto já está cadastrado.";
        console.log(errMessage);
        return res.status(400).json("O produto já está cadastrado.");
      } else {
        const SQL =
          "UPDATE estoque SET quantidade = ?, dataValidade = ?, lote= ?, idProduto = ? WHERE idestoque = ?";

        db.query(
          SQL,
          [quantidade, dataValidade, lote, idproduto, idestoque],
          (err, result) => {
            if (err) console.log(err);
            return res
              .status(200)
              .json("Produto editado no estoque com sucesso");
          }
        );
      }
    }
  );
};

module.exports.deleteEstoque = (req, res) => {
  const { id } = req.params;
  console.log(" estoque " + id);
  let SQL = "DELETE FROM estoque WHERE idestoque = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    return res.status(200).json("Produto deletado do estoque com sucesso");
  });
};
