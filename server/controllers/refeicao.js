const { db } = require("../db.js");

module.exports.addRefeicao = (req, res) => {
  const { nome, valor } = req.body;
  // Verifica se a refeição já está cadastrada
  console.log("nome " + valor + "valor " + valor);
  const SQL2 =
    "SELECT * FROM refeicoes WHERE nome = ? ";
  const result2 = db.query(
    SQL2,
    [nome],
    (err, result2) => {
      console.log(result2);
      if (result2.length > 0) {
        // A refeição já está cadastrada

        const errMessage = "O produto já está cadastrado.";
        console.log(errMessage);
        return res.status(400).json({ message: errMessage });
      } else {
        // A refeição não está cadastrada
        const SQL =
          "INSERT INTO refeicoes (nome, valor) VALUES (?,?)";

        db.query(
          SQL,
          [nome, valor],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json("Erro ao criar a refeição.");
            }

            return res.status(200).json("Refeição criada com sucesso.");
          }
        );
      }
    }
  );
};

module.exports.getRefeicao = (req, res) => {
  let SQL = "SELECT * FROM refeicoes";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
};

module.exports.uptadeRefeicao = (req, res) => {
  const { nome } = req.body;
  const { valor } = req.body;
  const { id } = req.body;

  const SQL2 =
    "SELECT * FROM refeicoes WHERE nome = ? ";
  const result2 = db.query(
    SQL2,
    [nome],
    (err, result2) => {
      console.log(result2);
      if (result2.length > 0) {
        // A refeição já está cadastrada

        const errMessage = "A refeição já está cadastrada.";
        console.log(errMessage);
        return res.status(400).json("A refeição já está cadastrada.");
      } else {
        let SQL =
          "UPDATE refeicoes SET nome = ?, valor = ? WHERE idRefeicao = ? ";

        db.query(
          SQL,
          [nome, valor, id],
          (err, result) => {
            if (err) console.log(err);
            else return res.status(200).json("Refeição editada com sucesso.");
          }
        );
      }
    }
  );
};

module.exports.deleteRefeicao = (req, res) => {
  const { id } = req.params;
  console.log("id " + id)
  let SQL = "DELETE FROM refeicoes WHERE idRefeicao = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else return res.status(200).json("Refeição deletada com sucesso.");
  });
};
