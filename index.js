const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*', // Allow connections from any origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Client connected to hosted server');

  socket.on('print', (data) => {
    console.log('Print request received:', data);
    try {
      socket.broadcast.emit('print', data);
    } catch (error) {
      console.log('Error:', error);
    }
  });

  socket.on('printResponse', (data) => {
    console.log('Print response received from Electron app:', data);
    socket.emit('printResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected from hosted server');
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Hosted server listening on port ${port}`);
});