'use strict';

let eventPool = require('../eventPool');
const { handleShipping } = require('./handler');

eventPool.on('pickup', handleShipping);
