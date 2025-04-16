const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      _id: String,
      title: String,
      quantity: Number,
      price: Number,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
