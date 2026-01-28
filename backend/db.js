const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "alem_cinema"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

module.exports = db;
