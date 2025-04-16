const express = require("express");
const router = express.Router();
const { 
    getChefs,
    createChef,
    updateChef,
    deleteChef 

} = require("../controllers/chefController");

// Route lấy tất cả menu
router.get("/", getChefs);

// Thêm chef mới
router.post("/", createChef);

// Cập nhật chef
router.put("/:id", updateChef);

// Xóa chef
router.delete("/:id", deleteChef);

module.exports = router;
