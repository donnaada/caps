'use strict';

const { io } = require('socket.io-client');
const { handleDriverPickup, handleDriverDelivered } = require('./handler');
const socket = io('http://localhost:4001/caps');

socket.emit('getAll', { queueId: 'driver' });

socket.on('pickup', (payload) => {

  setTimeout(() => {
    handleDriverPickup(payload, socket);
  }, 1500);

  setTimeout(() => {
    handleDriverDelivered(payload, socket);
  }, 2000);

  socket.emit('recevied', {queueId: 'driver', messageId: payload.messageId});
});
