const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
} = require("../controllers/cartController");

// Lấy giỏ hàng hiện tại
router.get("/", getCart);

// Thêm sản phẩm vào giỏ
router.post("/add", addToCart);

// cập nhật giỏ hàng
router.post("/update-cart", updateCart);

// Xóa sản phẩm khỏi giỏ
router.delete("/remove/:productId", removeFromCart);

module.exports = router;
