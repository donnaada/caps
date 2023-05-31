'use strict';

const eventPool = require('../eventPool');
const { handleReadyForPickup, handleDelivered } = require('./handler');

setInterval(() => {
  console.log('========================== NEW SHIPMENT IN PROGRESS ==========================')
  handleReadyForPickup();
}, 5250);

eventPool.on('delivered', handleDelivered);
