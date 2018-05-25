#!/usr/bin/env node

const executor = require('./executor.js');

// Grab provided args
const [,, ...args] = process.argv;


const commands = args[0].split(':');
const [,,, ...options] = process.argv;

const command = commands[0];
const subCommand = commands[1];

/* eslint-disable no-console */  
executor.execute(command, subCommand, options).then((res) => {

  if(res.errors) {
    var errorMessage = '';
    res.errors.foreach((error) => {
      errorMessage += error + '\n';
    });

    console.log(`
      An error has occured while executing the command
      ${errorMessage}
    `);

  } else {
    console.log(res.response);
  }
}).catch((e) => {
  console.log(e);
});