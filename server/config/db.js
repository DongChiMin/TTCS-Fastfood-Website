const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nguyenthihien6104:Hien09072004@webfastfood.3qkfesq.mongodb.net/?retryWrites=true&w=majority&appName=WEBFASTFOOD',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};

module.exports = connectDB;