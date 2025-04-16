const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Hàm chuyển category sang tên thư mục
const getFolderByCategory = (category) => {
    const formattedCategory = category?.trim().toLowerCase(); // Normalize category (optional chaining)
    console.log("he:", formattedCategory)
    console.log("Formatted category:", formattedCategory); // Debug
  
    if (formattedCategory === "maincourse") {
      return "main-courses";
    } else if (formattedCategory === "drink") {
      return "drinks";
    } else if (formattedCategory === "dessert") {
      return "desserts";
    } else if (formattedCategory === "appetizer") {
      return "appetizers"; // ✅ Sửa đúng tên thư mục
    } else {
      return "others";
    }
  };
  

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const rawCategory = req.body.category || "others";
      console.log("Category received:", rawCategory); // Add this log to see the category being passed
      const folderName = getFolderByCategory(rawCategory);
      const uploadDir = `uploads/menus/${folderName}`;
  
      // Tạo thư mục nếu chưa tồn tại
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      cb(null, uploadDir); // Lưu vào thư mục tương ứng
    },
  
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + path.extname(file.originalname);
      cb(null, uniqueName);
    },
  });

// Cấu hình Multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn dung lượng file là 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Middleware xử lý upload ảnh
exports.uploadImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err.message);
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};
