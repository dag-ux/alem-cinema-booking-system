const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { bookingId, amount } = req.body;

  const sql = `
    INSERT INTO payments (booking_id, amount, payment_status)
    VALUES (?, ?, 'PAID')
  `;

  db.query(sql, [bookingId, amount], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});

module.exports = router;
