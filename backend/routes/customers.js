const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  console.log("📥 Incoming customer:", req.body); // DEBUG

  const { fullName, phone, email } = req.body;

  const sql =
    "INSERT INTO customers (full_name, phone, email) VALUES (?, ?, ?)";

  db.query(sql, [fullName, phone, email], (err, result) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json(err);
    }

    res.json({ customerId: result.insertId });
  });
});

module.exports = router;
