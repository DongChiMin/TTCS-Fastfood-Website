const Cart = require("../models/cartModel");

exports.updateCart = async (req, res) => {
  const { cart } = req.body;
  const _id = "67fb8e201f70bf74520565e7"; // sau này thay bằng id giỏ hảng

  try {
    // Tìm giỏ hàng theo _id, nếu không có thì tạo mới
    let existingCart = await Cart.findOne({ _id });

    if (existingCart) {
      existingCart.items = cart;
      await existingCart.save();
    } else {
      await Cart.create({ _id, items: cart });
    }

    res.status(200).json({ message: "Giỏ hàng đã được cập nhật!" });
  } catch (error) {
    console.error("Lỗi cập nhật giỏ hàng:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật giỏ hàng." });
  }
};

// Lấy giỏ hàng hiện tại
exports.getCart = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Missing cart id" });
    }

    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Thêm sản phẩm vào giỏ hàng
exports.addToCart = async (req, res) => {
  try {
    const { cartId, items } = req.body;

    const cart = await Cart.findById(cartId);
    console.log("📦 Items received:", items);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Lặp qua từng item gửi lên
    items.forEach((newItem) => {
      const existingItem = cart.items.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        cart.items.push(newItem);
      }
    });

    const updatedCart = await cart.save();
    res.status(200).json({ message: "Cart updated", data: updatedCart });
  } catch (error) {
    console.error("🔴 Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne();

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId !== productId);

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
