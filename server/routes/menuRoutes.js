const express = require("express");
const router = express.Router();
const {
  getMenus,
  getMenuById,
  getMenuByCategory,
  updateMenu,
  createMenu,
  deleteMenu,
} = require("../controllers/menuController");

// Route lấy tất cả menu
router.get("/", getMenus);

// Route lấy món ăn theo id
router.get("/:id", getMenuById);

//Route lấy 4 món ăn theo category
router.get("/category/:category", getMenuByCategory);

// Route cập nhật món ăn
router.put("/:id", updateMenu);

// Route to create a new menu item
router.post("/", createMenu);

// Route xóa món ăn
router.delete("/:id", deleteMenu);

module.exports = router;
