'use strict;'

require('dotenv').config({ path: '../.env' });
const { Server } = require('socket.io');
let PORT = process.env.PORT || process.env.PORT2;

const server = new Server();

console.log(PORT);

server.listen(PORT);

server.on('connection', (socket) => {
  console.log(`Connection established on event server ${socket.id}`);

  socket.on('Message', (payload) => {
    console.log(`SERVER EVENT`, payload)

    socket.broadcast.emit('Message', payload)
  });

  socket.on('Received', (payload) => {
    console.log(`SERVER RECEIVED`, payload);
    socket.broadcast.emit('Received', payload);
  });

});

let caps = server.of('/caps');
caps.on('connection', (socket) => {
  console.log(`Connected in the /caps namespace. SocketId: ${socket.id}`);

  socket.on('Join', (room) => {
    socket.join(room);
    console.log(`Welcom to the ${room} room`);
  });
});