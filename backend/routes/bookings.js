const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { customerId, movieId, date, time, price } = req.body;

  const sql = `
    INSERT INTO bookings (customer_id, movie_id, booking_date, booking_time, total_price)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [customerId, movieId, date, time, price], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ bookingId: result.insertId });
  });
});

module.exports = router;
