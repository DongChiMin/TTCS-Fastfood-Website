const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const path = require("path");

// Route imports
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const chefRoutes = require("./routes/chefRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
require("dotenv").config();

// Kết nối MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// API routes
app.use("/api/menus", menuRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/chefs", chefRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api", uploadRoutes);

// Cho phép frontend truy cập thư mục ảnh (ví dụ /uploads/drinks/abc.jpg)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
