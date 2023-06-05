'use strict';
const { io } = require('socket.io-client');
const socket = io(`http://localhost:4001/caps`)

const { handleReadyForPickup, thankDriver } = require('./handler');

socket.emit('join', 'caps')

setInterval(() => {
  console.log('========================== NEW SHIPMENT IN PROGRESS ==========================')
  handleReadyForPickup(socket);
}, 5250);

socket.on('delivered', (payload) =>{
  setTimeout(() => {
    thankDriver(payload);
  }, 1000);
});
