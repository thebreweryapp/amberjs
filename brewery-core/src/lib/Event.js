const EventEmitter = require('events');
const define = Object.defineProperty;

class Event extends EventEmitter {

  static setEvents(outputs) {
    define(this.prototype, 'outputs', {
      value: createEvents(outputs)
    });
  }

  on(event, handler) {
    if(this.events[event]) {
      return this.addListener(event, handler);
    }

    throw new Error(`Invalid event "${event}" to operation ${this.constructor.name}.`);
  }
}

const createEvents = (outputsArray) => {
  return outputsArray.reduce((obj, output) => {
    obj[output] = output;
    return obj;
  }, Object.create(null));
};

module.exports = Event;
