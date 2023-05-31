'use strict';

const eventPool = require('./eventPool');
const timestamp = new Date().toISOString();

require('./vendor/index');
require('./driver/index');

eventPool.on('pickup', (payload) => logger('pickup', payload));
eventPool.on('in-transit', (payload) => logger('in-transit', payload));
eventPool.on('delivered', (payload) => logger('delivered', payload));

function logger(event, payload){
  console.log('EVENT: ', { event, timestamp, payload });
}
