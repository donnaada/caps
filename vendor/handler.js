'use strict;'

let eventPool = require('../eventPool');

const Chance = require('chance');
let chance = new Chance();

let payload = {
  store: chance.company(),
  orderID: chance.guid(),
  customer: chance.name(),
  address: `${chance.city()}, ${chance.state()}`,
};

eventPool.emit('pickup', payload);
