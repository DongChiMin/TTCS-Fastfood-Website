const multer = require('multer');

// Cấu hình Multer để lưu tệp tin vào bộ nhớ (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // Giới hạn file size là 10MB
  });

// Middleware Multer để xử lý file upload
const uploadSingleImage = upload.single('image'); 

module.exports = uploadSingleImage;
