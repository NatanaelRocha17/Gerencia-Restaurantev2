const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "natanrocha",
    database: "bdrestaurante",
  });

  module.exports.db = db;