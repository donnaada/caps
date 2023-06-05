'use strict';

// let eventPool = require('../../eventPool')
// import { io } from 'socket.io-client';
// const socket = io(`http://localhost:4001/caps`)
const Chance = require('chance');
let chance = new Chance();

let storeName = 'acme-widgets';

const handleReadyForPickup = (socket, order=null) => {
  if(!order){
    order = {
      store : storeName,
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }

  let payload = {
    event: 'pickup',
    messageId: order.orderId,
    queueId: storeName,
    order,
  };

  console.log('VENDOR: ORDER ready for pickup:', payload);
  socket.emit('pickup', payload);
};

const thankDriver = (payload) => console.log('VENDOR: Thank you for your order', payload.order.customer);

module.exports = {
  handleReadyForPickup,
  thankDriver,
};
