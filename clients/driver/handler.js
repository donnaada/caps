'use strict';

const { io } = require('socket.io-client');
const socket = io(`http://localhost:4001/caps`)

let handleDriverPickup = (payload) => {
  console.log(`DRIVER: Picking up ${payload.orderID}`);

  socket.emit('in-transit', payload);
};

let handleDriverDelivered = (payload) => {
  socket.emit('delivered', payload);
};

let handleShipping = (payload) => {

  setTimeout(() => {
    console.log(` Order for ${payload.customer} is on its way.`);

    handleDriverPickup(payload);
  }, 1500);

  setTimeout(() => {
    console.log(`Order for ${payload.customer} has been delivered! -Driver.`);
    handleDriverDelivered(payload);
  }, 2000);
};

module.exports = {
  handleDriverPickup,
  handleDriverDelivered,
  handleShipping,
};
