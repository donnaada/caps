'use strict';

// let eventPool = require('../../eventPool')
const { io } = require('socket.io-client');
const socket = io(`http://localhost:4001/caps`)
const Chance = require('chance');
let chance = new Chance();

let storeName = '1-206-flowers';

const handleReadyForPickup = (payload = null) => {

  if (!payload) {
    payload = {
      store: storeName,
      orderID: chance.guid(),
      customer: chance.name(),
      address: `${chance.city()}, ${chance.state()}`,
    }
  };
  console.log(` Order for ${payload.customer} created and has been dispatched.`)
  socket.emit('pickup', payload)
};

let handleDelivered = (payload) => {
  setTimeout(() => {
    socket.emit(payload,);
    console.log(`Thank you for your order ${payload.customer}.`)

  }, 1500);
}

module.exports = {
  handleReadyForPickup,
  handleDelivered
};
