const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Phục vụ file HTML từ thư mục 'public'
app.use(express.static('public')); 

// Hoặc phục vụ file index.html ở thư mục gốc
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});