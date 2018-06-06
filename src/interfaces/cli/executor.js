const fs = require('fs');
const defaultAction = require('./actions/default');

const loadConfig = (command) => {
  var config = JSON.parse(fs.readFileSync(`${__dirname}/configs/${command}.json`, 'utf8'));
  return config;
};


const executor = (command, subCommand, rootOption) => {

  if(command.name){
    const config = loadConfig(command.name);
    const execute = require(config.execPath);
    execute(config, command, subCommand);
  } else {
    defaultAction();
  }
  

};

module.exports = executor;