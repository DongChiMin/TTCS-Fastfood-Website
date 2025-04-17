const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const chefRoutes = require("./routes/chefRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const uploadRoutes = require("./routes/uploadRoutes"); // Thêm import upload route

const app = express();
require("dotenv").config();

// Kết nối đến MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Giới hạn 10MB
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use("/api/menus", menuRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/chefs", chefRoutes);
app.use("/api/reservations", reservationRoutes);

// Thêm route upload ảnh
app.use("/api", uploadRoutes);

// Upload: Cho phép truy cập vào thư mục uploads
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
