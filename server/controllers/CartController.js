// controllers/CartController.js
const Cart = require('../models/Cart');

// Lấy giỏ hàng
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.userId || 'guest' }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.body.userId || 'guest' });
    const productId = req.body.productId;
    const quantity = req.body.quantity || 1;

    if (!cart) {
      cart = new Cart({
        userId: req.body.userId || 'guest',
        items: [{ productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.userId || 'guest' });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== req.body.productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};