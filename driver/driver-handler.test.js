'use strict';

let eventPool = require('../eventPool');
const { handleReadyForPickup, handleDelivered } = require('./handler');

jest.mock('../eventPool.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

let consoleSpy;

beforeAll(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation();
});

afterAll(() => {
  consoleSpy.mockRestore();
});

describe('Testing driver handlers', () => {

  test('Should log and emit in-transit after pick up occurs', () => {
    let payload = { orderId: 12345 };
    handleReadyForPickup(payload);

    expect(eventPool.emit).toHaveBeenCalledWith('in-transit', payload);
    expect(consoleSpy).toHaveBeenCalledWith('DRIVER: picked up', payload.orderId);
  });


  test('should emit delivered and log Driver delivery ', () => {
    let payload = { orderId: 12345};
    handleDelivered(payload);

    expect(eventPool.emit).toHaveBeenCalledWith('delivered', payload);
    expect(consoleSpy).toHaveBeenCalledWith('DRIVER: delivered', payload.orderId);
  });


});
