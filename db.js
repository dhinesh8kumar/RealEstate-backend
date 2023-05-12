const mysql = require("mysql2");
const db = mysql.createPool({
  host: "sozores.mysql.database.azure.com",
  user: "nb501",
  password: "1234Asdf@",
  database: "realestate"
})
module.exports = db;