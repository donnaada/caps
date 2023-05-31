'use strict';

let eventEmitter = require('../eventPool');

const { handleReadyForPickup, handleDelivered } = require('./handler');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe('Vendor handlers', () => {

  test('Should log correct emit and console log for orderHandler', () => {
    let payload = {
      store: '1-206-flowers',
      orderID: '333d575e-c4e5-5567-8b47-5a08a4327bd8',
      customer: 'Adrian Murray',
      address: 'Dultezwo, CO'
    };

    handleReadyForPickup(payload);

    expect(eventEmitter.emit).toHaveBeenCalledWith('pickup', payload);
  });

  test('Should log thank you message from Vendor to Driver', () => {
    let payload = {
      store: '1-206-flowers',
      orderID: '333d575e-c4e5-5567-8b47-5a08a4327bd8',
      customer: 'Adrian Murray',
      address: 'Dultezwo, CO'
    };
    handleDelivered(payload);
    expect(eventEmitter.emit).toHaveBeenCalledWith('pickup', payload);
  });

});
