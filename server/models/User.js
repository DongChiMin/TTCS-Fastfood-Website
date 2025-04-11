// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, required: true }, // Đặt required: true nếu cần thiết cho ứng dụng
    address: { type: String, required: true }, // Đặt required: true nếu cần thiết
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    resetPasswordToken: { type: String }, // Để hỗ trợ reset mật khẩu
    resetPasswordExpires: { type: Date }, // Thời gian hết hạn của token reset mật khẩu
});

// Cập nhật updatedAt trước khi lưu
UserSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Mã hóa mật khẩu trước khi lưu
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// So sánh mật khẩu khi đăng nhập
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);