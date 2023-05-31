'use strict';

let eventPool = require('../eventPool')
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


  eventPool.emit('pickup', payload)
};

let handleDelivered = (payload) => {
  setTimeout(() => {
    eventPool.emit(payload);
  }, 1500);
}

module.exports = {
  handleReadyForPickup,
  handleDelivered
};
