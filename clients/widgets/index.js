'use strict';
const { io } = require('socket.io-client');
const socket = io(`http://localhost:4001/caps`);
const store = 'acme-widgets';

const { handleReadyForPickup, thankDriver } = require('./handler');

socket.emit('join', store);
socket.emit('getAll', {queueId: store});

setInterval(() => {
  console.log(`========================== NEW SHIPMENT IN PROGRESS FOR ${store} ==========================`);
  handleReadyForPickup(socket);
}, 5250);

socket.on('delivered', (payload) =>{
  setTimeout(() => {
    socket.emit('recieved', payload);
    thankDriver(payload);
  }, 1000);
});
