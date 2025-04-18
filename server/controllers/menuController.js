const fs = require("fs");
const path = require("path");
const Product = require("../models/menuModel");

// Map category to folder name
const categoryToFolder = {
  drink: "drinks",
  dessert: "desserts",
  mainCourse: "main-courses",
  appetizer: "appetizers",
};
exports.getAllMenuItems = async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const query = filter ? { category: filter } : {};

    const items = await Product.find(query);
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: error.message }); // Trả về lỗi nếu có
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { name, price, category, description, tempFilename } = req.body;
    const priceNumber = parseFloat(price);

    const tempPath = path.join(__dirname, "../temp_uploads", tempFilename);

    const folderName = categoryToFolder[category];
    if (!folderName) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const categoryFolder = path.join(__dirname, "../uploads/menus", folderName);
    const finalPath = path.join(categoryFolder, tempFilename);
    console.log("temp path", tempPath);
    console.log("final path", finalPath);
    if (!fs.existsSync(categoryFolder)) {
      fs.mkdirSync(categoryFolder, { recursive: true });
    }

    if (fs.existsSync(tempPath)) {
      fs.renameSync(tempPath, finalPath);
    }
    console.log("temp path", tempPath);
    console.log("final path", finalPath);
    console.log(`${folderName}/${tempFilename}`);
    const newItem = await Product.create({
      name,
      price: priceNumber,
      category,
      description,
      imageUrl: `/uploads/menus/${folderName}/${tempFilename}`,
    });
    console.log("New item created", newItem);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa theo ID
exports.deleteMenuItem = async (req, res) => {
  console.log("Deleting item with ID:", req.params.id);

  try {
    const item = await Product.findById(req.params.id);
    console.log("Product data from DB:", item);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (item?.imageUrl) {
      const imagePath = path.join(__dirname, "..", item.imageUrl);
      console.log("Image Path: ", imagePath);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Image deleted successfully");
      } else {
        console.log("Image not found at path:", imagePath);
      }
    } else {
      console.log("No image associated with this item.");
    }

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item: ", error);
    res.status(500).json({ error: error.message });
  }
};

// lấy sản phẩm theo ID
exports.getMenuItemById = async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// update
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, tempFilename } = req.body;

    const item = await Product.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    let imageUrl = item.imageUrl;
    const categoryChanged = item.category !== category;

    if (tempFilename) {
      // Có ảnh mới upload
      const tempPath = path.join(__dirname, "../temp_uploads", tempFilename);
      if (!fs.existsSync(tempPath)) {
        return res.status(400).json({ error: "Temporary image not found" });
      }

      const newFolder = categoryToFolder[category];
      if (!newFolder) {
        return res.status(400).json({ error: "Invalid category" });
      }

      const newPath = path.join(__dirname, "../uploads/menus", newFolder);
      const finalPath = path.join(newPath, tempFilename);

      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
      }

      // Xóa ảnh cũ nếu có
      if (item.imageUrl) {
        const oldImagePath = path.join(__dirname, "..", item.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      fs.renameSync(tempPath, finalPath);
      imageUrl = `/uploads/menus/${newFolder}/${tempFilename}`;
    } else if (categoryChanged && item.imageUrl) {
      // Không có ảnh mới nhưng đổi category => chuyển ảnh sang thư mục mới
      const oldImagePath = path.join(__dirname, "..", item.imageUrl);
      const filename = path.basename(item.imageUrl);

      const newFolder = categoryToFolder[category];
      if (!newFolder) {
        return res.status(400).json({ error: "Invalid category" });
      }

      const newPath = path.join(__dirname, "../uploads/menus", newFolder);
      const newImagePath = path.join(newPath, filename);

      if (!fs.existsSync(newPath)) {
        fs.mkdirSync(newPath, { recursive: true });
      }

      if (fs.existsSync(oldImagePath)) {
        fs.renameSync(oldImagePath, newImagePath);
        imageUrl = `/uploads/menus/${newFolder}/${filename}`;
      }
    }

    item.name = name || item.name;
    item.price = price ? parseFloat(price) : item.price;
    item.category = category || item.category;
    item.description = description || item.description;
    item.imageUrl = imageUrl;

    await item.save();
    res.status(200).json(item);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: error.message });
  }
};
