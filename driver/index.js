'use strict';

let eventPool = require('../eventPool');

let handlerDriverPickup = (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);

    eventPool.emit('EVENT', 'in-transit', payload);
    eventPool.emit('in-transit', payload);
  }, 1000);
};

let handleInTransit = (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: delivered up ${payload.orderID}`);
    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);

    eventPool.emit('EVENT', 'delivered', payload);
  }, 1000);
};

module.exports = {
  handlerDriverPickup,
  handleInTransit
};