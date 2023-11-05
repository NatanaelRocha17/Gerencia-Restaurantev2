const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(express.json()); // Middleware para analisar o corpo da solicitação JSON
app.use(cors());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "natanrocha",
  database: "bdrestaurante",
});

app.use(cors()); // Chame a função cors aqui
app.use(express.json());


//Banco de dados tabela Produto
app.post("/registerProduto", (req, res) => {
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

            return res.status(200).json("Produto cadastrado com sucesso!");
          }
        );
      }
    }
  );
});

app.get("/getProdutos", (req, res) => {
  let SQL = "SELECT * FROM produtos";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.put("/editarProduto", (req, res) => {
  const { nome } = req.body;
  const { valor } = req.body;
  const { marca } = req.body;
  const { medida } = req.body;
  const { unidade } = req.body;
  const { fornecedor } = req.body;
  const { idproduto } = req.body;

  const SQL2 ="SELECT * FROM produtos WHERE nome = ? AND marca = ? AND valor = ? AND unidade = ? AND medida = ? AND fornecedor = ?";
  const result2 = db.query(
    SQL2,
    [nome, marca, valor,unidade, medida, fornecedor],
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
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let SQL = "DELETE FROM produtos WHERE idproduto = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else return res.status(200).json("Produto deletado com sucesso.");
  });
});

//Estoque

app.post("/adicionarProdutoEstoque", (req, res) => {
  console.log("Caiu aqui");
  const { idProduto, quantidade, lote, dataValidade } = req.body;

  const SQL2 =
    "SELECT * FROM estoque WHERE idProduto = ? AND lote = ?";

    const result2 = db.query(
        SQL2,
        [idProduto, lote],
        (err, result2) => {
          console.log(result2);
          if (result2.length > 0) {
            // O produto já está cadastrado
    
            const errMessage = "O produto já está cadastrado.";
            console.log(errMessage);
            return res.status(400).json("O produto já está cadastrado.");
          } else {
            const SQL =
                "INSERT INTO estoque (idProduto, quantidade, lote, dataValidade) VALUES (?,?,?,?)";

            db.query(SQL, [idProduto, quantidade, lote, dataValidade], (err, result) => {
                if (err) console.log(err);
                return res.status(200).json("Produto adicionado ao estoque com sucesso!");
            });

          }
        });
})


app.get("/getProdutosEstoque", (req, res) => {
  let SQL =
    "SELECT * FROM produtos INNER JOIN estoque ON produtos.idproduto = estoque.idProduto";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

//atualizar

app.put("/editarProdutoEstoque", (req, res) => {
  const { quantidade } = req.body;
  const { dataValidade } = req.body;
  const { lote } = req.body;
  const { idestoque } = req.body;
  const { idproduto } = req.body;

  const SQL2 =
  "SELECT * FROM estoque WHERE idProduto = ? AND lote = ?";

  const result2 = db.query(
      SQL2,
      [idproduto, lote],
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
              return res.status(200).json("Produto editado no estoque com sucesso");
            }
          );
        }
      });

});

app.delete("/deleteProdutoEstoque/:id", (req, res) => {
  const { id } = req.params;
  console.log(" estoque " + id);
  let SQL = "DELETE FROM estoque WHERE idestoque = ?";
  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    return res.status(200).json("Produto deletado do estoque com sucesso");
  });
});

app.listen(3002, () => {
  console.log("Iniciando servidor na porta 3002");
});
