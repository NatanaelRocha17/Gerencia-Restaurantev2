const { db } = require("../db.js");

const addFornecedor = (req, res) => {
 
  const { razaoSocial, email, telefone, cnpj } = req.body;
  const { logradouro, cep, numero, cidade, uf, bairro } = req.body;
  console.log(logradouro, cep, numero, bairro, uf);
  console.log("bairro" + bairro)
  const verificarFornecedor = () => {
    return new Promise((resolve, reject) => {
      const SQL2 = "SELECT * FROM fornecedor WHERE razao_social = ? AND cnpj = ?";
      db.query(SQL2, [razaoSocial, cnpj], (err, result2) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        if (result2.length > 0) {
          const errMessage = "O fornecedor já está cadastrado.";
          console.log(errMessage);
          reject(errMessage);
        } else {
          resolve();
        }
      });
    });
  };

  const adicionarFornecedor = async () => {
    try {
      await verificarFornecedor();

      const SQL =
        "INSERT INTO fornecedor (razao_social, email, telefone, cnpj) VALUES (?,?,?,?)";

      db.query(SQL, [razaoSocial, email, telefone, cnpj], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Erro interno do servidor." });
        }

        const ultimoIdFornecedor = result.insertId;
        console.log("ID do Fornecedor: " + ultimoIdFornecedor);

        const SQL3 =
          "INSERT INTO enderecos_fornecedor (fornecedor_id, rua, cidade, estado, codigo_postal, numero, bairro) VALUES (?, ?, ?, ?, ?, ?, ?)";

        db.query(
          SQL3,
          [ultimoIdFornecedor, logradouro, cidade, uf, cep, numero, bairro],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ message: "Erro interno do servidor." });
            }

            console.log("Fornecedor e endereço inseridos com sucesso!");
            //return res.send({ success: true });

            // Retornando o ID do fornecedor
            return res.send({ success: true, fornecedorId: ultimoIdFornecedor });
          }
        );
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };

  adicionarFornecedor();
}

/*const getFornecedor = (req, res) => {
  let SQL = "SELECT * FROM fornecedor";


  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
};*/
const getFornecedor = (req, res) => {
  const SQL = `
    SELECT
      f.*,
      ef.rua,
      ef.cidade,
      ef.estado,
      ef.codigo_postal,
      ef.numero,
      ef.bairro
    FROM
      fornecedor AS f
      LEFT JOIN enderecos_fornecedor AS ef ON f.id = ef.fornecedor_id;
  `;

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Nenhum fornecedor encontrado." });
    }

    // Mapeia o resultado para o formato desejado (pode variar conforme sua necessidade)
    const fornecedores = result.map((fornecedor) => ({
      id: fornecedor.id,
      razao_social: fornecedor.razao_social,
      email: fornecedor.email,
      telefone: fornecedor.telefone,
      cnpj: fornecedor.cnpj,
      bairro: fornecedor.bairro,
      enderecos: [
        {
          rua: fornecedor.rua,
          cidade: fornecedor.cidade,
          estado: fornecedor.estado,
          codigo_postal: fornecedor.codigo_postal,
          numero: fornecedor.numero,
          bairro: fornecedor.bairro

        },
      ],
    }));

    return res.status(200).json(fornecedores);
  });
};




/*
const uptadeFornecedor = (req, res) => {
  const { razaoSocial, email, telefone, cnpj, id } = req.body;
  const SQL2 = "SELECT * FROM fornecedor WHERE cnpj = ?";
  const result2 = db.query(SQL2, [cnpj], (err, result2) => {
    if (result2.length > 0) {
      // O produto já está cadastrado

      const errMessage = "O Fornecedor já está cadastrado.";
      console.log(errMessage);
      return res.status(400).json("O Fornecedor já está cadastrado.");
    } else {
      let SQL =
        "UPDATE fornecedor SET razaoSocial = ?, email = ?, telefone= ?, cnpj = ? WHERE id = ?";

      db.query(SQL, [razaoSocial, email, telefone, cnpj, id], (err, result) => {
        if (err) console.log(err);
        else return res.status(200).json("Fornecedor editado com sucesso.");
      });
    }
  });
};
*/

const updateFornecedor = (req, res) => {
  const { razao_social, email, telefone, cnpj, id } = req.body;
  const { logradouro, cep, numero, cidade, uf, bairro } = req.body;

  // Validar se já existe um CNPJ igual no banco de dados
  const checkExistingCNPJ = () => {
    return new Promise((resolve, reject) => {
      const SQL = "SELECT id FROM fornecedor WHERE cnpj = ? AND id != ?";
      db.query(SQL, [cnpj, id], (err, result) => {
        if (err) {
          console.log(err);
          reject("Erro interno do servidor.");
        } else if (result.length > 0) {
          // CNPJ já existe no banco
          reject("CNPJ já cadastrado no sistema.");
        } else {
          // CNPJ não existe no banco
          resolve();
        }
      });
    });
  };

  // Atualizar fornecedor e endereço apenas se o CNPJ não existir
  const updateFornecedorDetails = () => {
    return new Promise((resolve, reject) => {
      const SQL =
        "UPDATE fornecedor SET razao_social = ?, email = ?, telefone = ?, cnpj = ? WHERE id = ?";
      db.query(SQL, [razao_social, email, telefone, cnpj, id], (err, result) => {
        if (err) {
          console.log(err);
          reject("Erro interno do servidor.");
        } else {
          resolve();
        }
      });
    });
  };

  const updateEnderecoFornecedor = () => {
    return new Promise((resolve, reject) => {
      const SQL =
        "UPDATE enderecos_fornecedor SET rua = ?, cidade = ?, estado = ?, codigo_postal = ?, numero = ?, bairro = ? WHERE fornecedor_id = ?";
      db.query(
        SQL,
        [logradouro, cidade, uf, cep, numero, bairro, id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject("Erro interno do servidor.");
          } else {
            resolve();
          }
        }
      );
    });
  

  // Executar as validações e atualizações em sequência
  checkExistingCNPJ()
    .then(() => updateFornecedorDetails())
    .then(() => updateEnderecoFornecedor())
    .then(() => res.status(200).send("Fornecedor atualizado com sucesso"))
    .catch((error) => res.status(400).send(error));
};



  const handleUpdate = async () => {
    try {
      await updateFornecedorDetails();
      await updateEnderecoFornecedor();

      return res.status(200).json("Fornecedor e endereço atualizados com sucesso.");
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  };

  handleUpdate();

};


const deleteFornecedor = (req, res) => {
  const { id } = req.params;
  console.log("DI " + id)
  // Antes de excluir o fornecedor, exclua os registros relacionados na tabela enderecos_fornecedor
  let deleteEnderecosSQL1 = "DELETE FROM enderecos_fornecedor WHERE fornecedor_id = ?";
  db.query(deleteEnderecosSQL1, [id], (err, enderecosResult) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Erro interno do servidor ao excluir endereços do fornecedor.");
    }

    // Agora que os registros na tabela enderecos_fornecedor foram excluídos, exclua o fornecedor
    let deleteFornecedorSQL2 = "DELETE FROM fornecedor WHERE id = ?";
    db.query(deleteFornecedorSQL2, [id], (err, fornecedorResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Erro interno do servidor ao excluir fornecedor.");
      }

      return res.status(200).json("Fornecedor e endereços deletados com sucesso.");
    });
  });
};


module.exports = {
  addFornecedor,
  getFornecedor,
  updateFornecedor, // Corrigido o nome da função aqui
  deleteFornecedor
  // Outras funções...
};