'use strict';

const { handleReadyForPickup, handleDelivered } = require('./handler');

const { io } = require('socket.io-client');
const socket = io(`http://localhost:4001/caps`)

socket.emit('Join', 'caps')

setInterval(() => {
  console.log('========================== NEW SHIPMENT IN PROGRESS ==========================')
  handleReadyForPickup();
}, 5250);

socket.on('delivered', handleDelivered);
