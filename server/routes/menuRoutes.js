const express = require("express");
const router = express.Router();
const {
  createMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
} = require("../controllers/menuController");

router.post("/", createMenuItem);
router.delete("/:id", deleteMenuItem);
router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);
router.put("/:id", updateMenuItem);

module.exports = router;
