// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io-client'); // Import socket.io-client

// const app = express();
// const server = http.createServer(app);

// const io = require('socket.io')(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST'],
//         allowedHeaders: ['Content-Type'],
//         credentials: true,
//     },
// });

// const localServerSocket = socketIO('http://192.168.21.232:4005');

// io.on('connection', (socket) => {
//   console.log('Client connected');

//   socket.on('print', (data) => {
//     console.log('Print request received:', data);
//     try {
//         //localServerSocket.emit('print', data); 
//         localServerSocket.emit('print', data); 

//     } catch (error) {
//         console.log("Error Occur: "+error);
//     } 
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// const port = process.env.PORT || 3001;
// server.listen(port, () => {
//   console.log(`Hosted Node app listening on port ${port}`);
// });


// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const ios = require('socket.io-client'); 

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true,
//   },
// });

// io.on('connection', (socket) => {
//   console.log('Client connected');

//   socket.on('print', (data) => {
//     console.log('Print request received:', data);
//     try {
//       const electronAppSocket = ios('ws://localhost:8000');
//       electronAppSocket.emit('print', data);
//       electronAppSocket.disconnect();
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// const port = process.env.PORT || 3001;
// server.listen(port, () => {
//   console.log(`Hosted Node.js server listening on port ${port}`);
// });


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

  socket.on('disconnect', () => {
    console.log('Client disconnected from hosted server');
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Hosted server listening on port ${port}`);
});