'use strict';

const eventPool = require('./eventPool');
const Chance = require('chance');
let chance = new Chance();
let timestamp = new Date().toISOString();

const { handleReadyForPickup, handleDelivered } = require('./vendor');
const { handlerDriverPickup, handleInTransit } = require('./driver');


const payload = {
  store: '1-206-flowers',
  orderID: chance.guid(),
  customer: chance.name(),
  address: `${chance.city()}, ${chance.state()}`,
}

handleReadyForPickup(payload);
eventPool.on('pickup', handlerDriverPickup);
eventPool.on('in-transit', handleDelivered);
eventPool.on('delivered', handleInTransit);
eventPool.on('EVENT', (event, payload) => {
  console.log(`EVENT: { event: '${event}', 
    time: ${timestamp}, 
    payload: 
    { store: '${payload.store}',
      orderID: '${payload.orderID}',
      customer: '${payload.customer}',
      address: '${payload.address}'}}
  `);
});

