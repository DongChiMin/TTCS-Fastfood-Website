// routes/cart.js
const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/CartController');

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove', removeFromCart);

module.exports = router;