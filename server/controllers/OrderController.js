// controllers/OrderController.js
const Order = require('../models/Order');

// Tạo đơn hàng
exports.createOrder = async (req, res) => {
  const order = new Order({
    userId: req.body.userId || 'guest',
    items: req.body.items,
    total: req.body.total,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy tất cả đơn hàng
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};