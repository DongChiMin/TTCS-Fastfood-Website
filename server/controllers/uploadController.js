const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Hàm xử lý upload ảnh, trả về thông tin ảnh và base64
exports.uploadImage = (req, res) => {
  try {
    const file = req.file; // File sẽ được lưu trong req.file sau khi qua middleware Multer

    if (!file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const fileName = uuidv4() + path.extname(file.originalname); // Tạo tên file duy nhất

    // Trả về thông tin về ảnh (fileName, mimeType, imageBuffer dưới dạng base64)
    res.status(200).json({
      message: "Image uploaded temporarily",
      fileName,
      mimeType: file.mimetype,
      imageBuffer: file.buffer.toString('base64'), 
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Hàm lưu ảnh vào thư mục uploads sau khi người dùng tạo sản phẩm

const getFolderByCategory = (category) => {
  const formatted = category?.trim().toLowerCase();
  if (formatted === "maincourse") return "main-courses";
  if (formatted === "drink") return "drinks";
  if (formatted === "dessert") return "desserts";
  if (formatted === "appetizer") return "appetizers";
  throw new Error("Invalid category");
};

exports.saveImageToUploads = (imageBufferBase64, fileName, mimeType, category) => {
  if (!imageBufferBase64 || !fileName || !category) return null;

  const folder = getFolderByCategory(category);
  const buffer = Buffer.from(imageBufferBase64, "base64");

  const uploadDir = path.join(__dirname, `../uploads/menus/${folder}`);
  const fullPath = path.join(uploadDir, fileName);

  try {
    // Tạo thư mục nếu chưa tồn tại
    fs.mkdirSync(uploadDir, { recursive: true });

    // Ghi ảnh vào thư mục uploads
    fs.writeFileSync(fullPath, buffer);

    // Trả về đường dẫn ảnh đã lưu
    return `/uploads/menus/${folder}/${fileName}`;
  } catch (err) {
    console.error("Error saving image:", err);
    return null;
  }
};