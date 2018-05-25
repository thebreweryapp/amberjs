const fs = require('fs');

const loadConfig = (command) => {

  var config = null;

  fs.readFile(`./configs/${command}.json`, 'utf8', function (err, data) {
    if (err) throw err;
    config = JSON.parse(data);
  });
  
  return config;
};


const executor = (command, subCommand, options) => {
  const config = loadConfig(command);
  const execute = require(config.execPath);

  var errors = null;
  var response = null;

  execute(config, subCommand, options).then((err, resp) => {
    errors = err;
    response = resp;
  });

  return {
    errors,
    response
  };

};

module.exports = executor;