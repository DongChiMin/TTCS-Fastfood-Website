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

// Lấy menu theo ID
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

// Lấy menu theo Category
exports.getMenuByCategory = async (req, res) => {
  const { category } = req.params; // Lấy category từ params

  try {
    const menus = await Menu.find({ category }).limit(4); // Tìm menu theo category và giới hạn kết quả là 4 món ăn

    if (menus.length === 0) {
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
      { new: true } // Trả về bản ghi đã cập nhật
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

// Tạo một món ăn mới
exports.createMenu = async (req, res) => {
  try {
    const { name, description, imageUrl, category, price } = req.body;

    // Kiểm tra thiếu field nào
    if (!name || !imageUrl || !price || !category) {
      return res.status(400).json({
        message: "Missing required fields: name, imageUrl, price, or category",
      });
    }

    // Kiểm tra category hợp lệ
    const validCategories = ['mainCourse', 'appertizers', 'drink', 'dessert']; // Đây là ví dụ các category hợp lệ
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category. Please choose a valid category.",
      });
    }

    const newMenu = new Menu({
      name,
      description: description || "",
      imageUrl,
      category,
      price: parseFloat(price), // ép về number
    });

    const savedMenu = await newMenu.save();

    res.status(201).json({
      message: "Menu created successfully",
      menu: savedMenu,
    });
  } catch (err) {
    console.error("❌ Error saving menu:", err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};
