'use strict';

let eventPool = require('../eventPool');
const { handleDriverPickup, handleInTransit } = require('./handler');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});


describe('Testing driver handlers', () => {

  test('Should log and emit in-transit after pick up occurs', () => {
    let payload = {
      store: '1-206-flowers',
      orderID: '333d575e-c4e5-5567-8b47-5a08a4327bd8',
      customer: 'Adrian Murray',
      address: 'Dultezwo, CO'
    };
    handleDriverPickup(payload);

    expect(eventPool.emit).toHaveBeenCalledWith('in-transit', payload);
  });


  test('should emit delivered and log Driver delivery ', () => {
    let payload = {
      store: '1-206-flowers',
      orderID: '333d575e-c4e5-5567-8b47-5a08a4327bd8',
      customer: 'Adrian Murray',
      address: 'Dultezwo, CO'
    };
    handleInTransit(payload);

    expect(eventPool.emit).toHaveBeenCalledWith('delivered', payload);
  });


});
