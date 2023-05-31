'use strict';

let eventPool = require('../eventPool');

let handleDriverPickup = (payload) => {
  console.log(`DRIVER: picked up ${payload.orderID}`);

  eventPool.emit('in-transit', payload);
};

let handleInTransit = (payload) => {
  console.log(`DRIVER: delivered up ${payload.orderID}`);
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);

  eventPool.emit('delivered', payload);
};

let handleShipping = (payload) => {

  setTimeout(() => {
    handleDriverPickup(payload);
  }, 1500);

  setTimeout(() => {
    handleInTransit(payload);
  }, 2000);
};

module.exports = {
  handleDriverPickup,
  handleInTransit,
  handleShipping,
};
