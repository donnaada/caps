'use strict';

class Queue {

  constructor(){
    this.data = {};
  }

  store(key, value){
    this.data[key] = value;
    console.log('added to queue', this.data);
    return key;
  }

  read(key){
    return this.data[key];
  }

  remove(key){
    console.log('Something deleted from queue');
    let value = this.data[key];
    delete this.data[key];
    return value;
  }
}

module.exports = Queue;
