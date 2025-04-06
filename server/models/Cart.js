// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String }, // Nếu không có đăng nhập, có thể để trống
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
  total: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cart', cartSchema);