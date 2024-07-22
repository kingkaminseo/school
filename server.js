const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// app.use(express.static('public'));

// /chat 경로로 접속했을 때 chat.html 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'school', 'create.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat-folder', 'chat.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
