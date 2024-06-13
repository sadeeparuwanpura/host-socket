const express = require('express');
const http = require('http');
const socketIO = require('socket.io-client'); // Import socket.io-client

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    },
});

const localServerSocket = socketIO('http://192.168.21.232:8001');

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('print', (data) => {
    console.log('Print request received:', data);


    localServerSocket.emit('print', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Hosted Node app listening on port ${port}`);
});