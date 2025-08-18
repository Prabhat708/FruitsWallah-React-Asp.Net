const http = require('http');
const express = require('express');
const app = express();  


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('FruitsWallah Backend Server is running!\n');
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});