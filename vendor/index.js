'use strict';

const eventPool = require('../eventPool');

let handleReadyForPickup = (payload) => {
  setTimeout(() => {
    console.log('<<<<<<<<<<<<<<<<<<<< new pickup begin >>>>>>>>>>>>>>>>>>>>');
    eventPool.emit('EVENT', 'pickup', payload);
    eventPool.emit('pickup', payload);
  }, 3500);
};

let handleDelivered = (payload) => {
  setTimeout(() => {
    eventPool.emit('delivered', payload);
  }, 1000);
}

module.exports = {
  handleReadyForPickup,
  handleDelivered
};