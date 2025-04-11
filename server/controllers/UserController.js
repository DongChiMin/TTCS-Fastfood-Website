// controllers/UserController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');


// Đăng ký người dùng
exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, address, role } = req.body;

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }

        // Tạo người dùng mới
        const user = new User({
            name,
            email,
            password,
            phone,
            address,
            role: role || 'customer', // Mặc định là customer nếu không truyền role
        });
        await user.save();

        res.status(201).json({ message: 'Đăng ký thành công', user: { id: user._id, name, email, role } });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Đăng nhập người dùng
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm người dùng theo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // So sánh mật khẩu
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // Tạo JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'Đăng nhập thành công',
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy từ middleware auth
        const { name, phone, address } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { name, phone, address, updatedAt: Date.now() },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        res.status(200).json({
            message: 'Cập nhật thông tin thành công',
            user: { id: user._id, name: user.name, email: user.email, phone: user.phone, address: user.address, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Lấy thông tin người dùng
exports.getUser = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy từ middleware auth
        const user = await User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpires'); // Không trả về các trường nhạy cảm

        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Lấy danh sách tất cả người dùng (chỉ dành cho admin)
exports.getAllUsers = async (req, res) => {
    try {
        // Kiểm tra role của người dùng
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
        }

        const users = await User.find().select('-password -resetPasswordToken -resetPasswordExpires');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Chỉ admin mới được xóa người dùng
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bạn không có quyền xóa người dùng' });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        res.status(200).json({ message: 'Xóa người dùng thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
