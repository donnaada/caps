'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:4001/caps')

const { handleShipping } = require('./handler');

socket.on('pickup', handleShipping);
