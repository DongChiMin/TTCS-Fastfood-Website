const express = require('express');
const uploadController = require('../controllers/uploadController');
const uploadMiddleware = require('../middleware/upload');

const router = express.Router();


router.post('/upload', uploadMiddleware, uploadController.uploadImage);

// Route tạo sản phẩm, sau khi ảnh đã được upload, sẽ lưu vào thư mục uploads
router.post('/create_product', (req, res) => {
  try {
    const { imageBufferBase64, fileName, mimeType, category } = req.body;

    // Gọi hàm lưu ảnh vào thư mục uploads
    const imagePath = uploadController.saveImageToUploads(imageBufferBase64, fileName, mimeType, category);

    if (imagePath) {
      res.status(200).json({ message: 'Sản phẩm đã được tạo thành công!', imagePath });
    } else {
      res.status(400).json({ message: 'Failed to save image' });
    }
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
