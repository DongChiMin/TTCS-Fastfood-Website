const Menu = require("../models/menuModel");

// Lấy danh sách menu
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find(); // Lấy tất cả các menu từ MongoDB
    res.json(menus); // Trả về dữ liệu dưới dạng JSON
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getMenuById = async (req, res) => {
  const { id } = req.params; // Lấy id từ params

  try {
    const menu = await Menu.findById(id); // Tìm menu theo id

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" }); // Nếu không tìm thấy menu
    }

    res.json(menu); // Trả về menu chi tiết
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getMenuByCategory = async (req, res) => {
  const { category } = req.params; // Lấy category từ params

  try {
    const menus = await Menu.find({ category }).limit(4); // Tìm menu theo category và giới hạn kết quả là 4 món ăn

    if (!menus) {
      return res.status(404).json({ message: "Menu not found" }); // Nếu không tìm thấy menu
    }

    res.json(menus); // Trả về danh sách menu
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Cập nhật món ăn
exports.updateMenu = async (req, res) => {
  const { id } = req.params;
  const { name, description, imageUrl, category, price } = req.body;

  try {
    const menu = await Menu.findByIdAndUpdate(
      id,
      { name, description, imageUrl, category, price },
      { new: true }
    );

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.json({ message: "Menu updated successfully", menu });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Xóa món ăn
exports.deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const menu = await Menu.findByIdAndDelete(id);

    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.json({ message: "Menu deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new menu item
exports.createMenu = async (req, res) => {
  const { name, description, imageUrl, category, price } = req.body;

  console.log("Received data:", req.body); // Log dữ liệu nhận được từ frontend

  try {
    const newMenu = new Menu({
      name,
      description,
      imageUrl,
      category,
      price,
    });

    const savedMenu = await newMenu.save();
    res
      .status(201)
      .json({ message: "Menu created successfully", menu: savedMenu });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
