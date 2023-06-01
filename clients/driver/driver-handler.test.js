'use strict';

let eventPool = require('../../eventPool');
const { handleDriverPickup, handleDriverDelivered } = require('./handler');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});


describe('Testing driver handler', () => {

  test('testing pickup handler', () => {
    let payload = {
      store: '1-206-flowers',
      orderID: '333d575e-c4e5-5567-8b47-5a08a4327bd8',
      customer: 'Adrian Murray',
      address: 'Dultezwo, CO'
    };
    handleDriverPickup(payload);

    expect(eventPool.emit).toHaveBeenCalledWith('in-transit', payload);
  });


  test('testing delivered handler', () => {
    let payload = {
      store: '1-206-flowers',
      orderID: '333d575e-c4e5-5567-8b47-5a08a4327bd8',
      customer: 'Adrian Murray',
      address: 'Dultezwo, CO'
    };
    handleDriverDelivered(payload);

    expect(eventPool.emit).toHaveBeenCalledWith('delivered', payload);
  });


});
