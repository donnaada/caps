'use strict';

require('dotenv').config({ path: '../.env' });
const { Server } = require('socket.io');
let PORT = process.env.PORT || process.env.PORT2;
const Queue = require('./lib/queue');
const queue = new Queue();

let timestamp = new Date().toUTCString();

const server = new Server();

console.log('Listening on Port number:',PORT);

server.listen(PORT);

let caps = server.of('/caps');
caps.on('connection', (socket) => {

  console.log(`Connected in the caps namespace. SocketId: ${socket.id}`);

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`Welcome to the ${room} room ${socket.id}`);
  });

  socket.onAny((event, payload) => {
    console.log('EVENT: ', {event, timestamp, payload});
  });

  socket.on('pickup', (payload) => {
    // console.log('Status: Pickup', timestamp, payload);
    let driverQueue = queue.read('driver');

    if (!driverQueue) {
      let driveKey = queue.store('driver', new Queue());
      driverQueue = queue.read(driveKey);
    }

    driverQueue.store(payload.messageId, payload);
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {

    let vendorQueue = queue.read('driver');

    if (!vendorQueue) {
      let vendorKey = queue.store(payload.queueId, new Queue());
      vendorQueue = queue.read(vendorKey);
    }

    vendorQueue.store(payload.messageId, payload);
    socket.to(payload.queueId).emit('delivered', payload);
  });

  socket.on('getAll', (payload) =>{
    let currentQueue = queue.read(payload.queueId);
    if (currentQueue && currentQueue.data){
      let objKeys = Object.keys(currentQueue.data);
      objKeys.forEach(messageId => {
        let savedPayload = currentQueue.read(messageId);
        socket.emit(savedPayload.event, savedPayload);
      });
    }
  });

  socket.on('recieved', (payload) =>{
    let currentQueue = queue.read(payload.queueId);
    if (!currentQueue){
      throw new Error('Payload exists but no queue');
    }
    currentQueue.remove(payload.messageId);
  });

});
