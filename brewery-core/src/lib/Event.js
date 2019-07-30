const EventEmitter = require('events');
const define = Object.defineProperty;

class Event extends EventEmitter {

  static setEvents(outputs) {
    define(this.prototype, 'outputs', {
      value: createEvents(outputs)
    });
  }

  on(output, handler) {
    if(this.outputs[output]) {
      return this.addListener(output, handler);
    }

    throw new Error(`Invalid output "${output}" to operation ${this.constructor.name}.`);
  }
}

const createEvents = (outputsArray) => {
  return outputsArray.reduce((obj, output) => {
    obj[output] = output;
    return obj;
  }, Object.create(null));
};

module.exports = Event;
