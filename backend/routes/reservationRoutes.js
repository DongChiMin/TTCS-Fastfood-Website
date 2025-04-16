const express = require("express");
const router = express.Router();

const { addReservation } = require("../controllers/reservationController");

// Thêm đặt bàn
router.post("/add", addReservation);

module.exports = router;
