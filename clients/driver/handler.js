'use strict';

let handleDriverPickup = (payload, socket) => {
  console.log('DRIVER: picked up', payload.order.orderId);
  socket.emit('in-transit', payload);
};

let handleDriverDelivered = (payload, socket) => {
  console.log('DRIVER: delivered', payload.order.orderId);
  socket.emit('delivered', payload);
};



module.exports = {
  handleDriverPickup,
  handleDriverDelivered,
};
