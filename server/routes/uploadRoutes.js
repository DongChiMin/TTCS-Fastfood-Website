const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');

router.post('/upload', uploadImage, (req, res) => {
  if (req.file) {
    // Trả về đường dẫn đầy đủ với đường dẫn theo thư mục đã chọn
    const imageUrl = `/uploads/menus/${req.body.category || 'others'}/${req.file.filename}`;
    res.json({ imageUrl });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

module.exports = router;
