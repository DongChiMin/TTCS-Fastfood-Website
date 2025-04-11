    // index.js
    const path = require('path');
    require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // 👈 Chỉ định rõ
    

    const express = require('express');
    const connectDB = require('./config/db.js');
    const userRoutes = require('./routes/user.js'); // Import user routes

    const app = express();
    const PORT = 5000;

    // Middleware
    app.use(express.json()); // Để xử lý JSON trong body của request

    // Routes
    app.get('/', (req, res) => {
        res.send('Hello');
    });

    // Tích hợp user routes
    app.use('/api/users', userRoutes);

    // Kết nối database và khởi động server
    const startServer = async () => {
        try {
            await connectDB(); // Kết nối database
            app.listen(PORT, () => {
                console.log(`Server started on port ${PORT}`);
            });
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1); // Thoát nếu không kết nối được database
        }
    };

    // Khởi động server
    startServer();