#!/usr/bin/env NODE_PATH=. node

const executor = require('./executor.js');

// Grab provided args
const [,, ...args] = process.argv;

const { command, subCommand, rootOption } = argumentParser(args);

/* eslint-disable no-console */  
executor(command, subCommand, rootOption);

function argumentParser(args) {
  var command = {
    name: null,
    options: {},
    value: null
  };
  var subCommand = {
    name: null,
    options: {},
    value: null
  };

  var rootOption = null;

  var options = [];
  var value = null;

  args.forEach((val, index) => {
    if(index === 0) {
      if(val.substring(0, 2) == '--'){
        // value is a root option
        rootOption = val;
      } else {
        // value is a command
        command.name = val.split(':')[0];
        subCommand.name = val.split(':')[1];
      }
    } else {
      if(val.substring(0, 2) == '--'){ 
        // argument is an option
        options.push({
          name: val.split('=')[0],
          value: val.split('=')[1]
        });
      } else {
        // argument is a value
        if (index === 1){
          value = val;
        } else {
          // error invalid argument
          throw new Error(`Invalid argument "${val}"`);
        }
      }
    }


    
  });

  if (subCommand.name) {
    subCommand.options = options;
    subCommand.value = value;
  } else {
    command.options = options;
    command.value = value;
  }

  return {
    command,
    subCommand,
    rootOption
  };
}