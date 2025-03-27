//test
const express = require('express')
const app = express()
const PORT = 5000
const connectDB = require('./config/db.js');
app.get('/', (req, res) => {
    res.send('Helo')
})
app.listen(PORT, () => console.log('Server started'))
connectDB();