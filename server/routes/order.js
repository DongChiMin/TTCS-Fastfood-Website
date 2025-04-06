// routes/order.js
const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/OrderController');

router.get('/', getOrders);
router.post('/', createOrder);

module.exports = router;