// routes/user.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middleware/auth');


// Đăng ký người dùng
router.post('/register', UserController.register);

// Đăng nhập người dùng
router.post('/login', UserController.login);

// Cập nhật thông tin người dùng (yêu cầu xác thực)
router.put('/update', auth, UserController.updateUser);

// Lấy thông tin người dùng (yêu cầu xác thực)
router.get('/me', auth, UserController.getUser);

// Lấy danh sách tất cả người dùng (chỉ dành cho admin)
router.get('/all', auth, UserController.getAllUsers);

//Xóa người dùngdùng
router.delete('/:id', auth, UserController.deleteUser);

module.exports = router;