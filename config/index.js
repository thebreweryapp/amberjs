require('dotenv').load();

const fs = require('fs');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;

const logConfig = loadLogConfig();
const dataSources = require('./dataSources.json');

const config = Object.assign({
  [ENV]: true,
  env: ENV,
  web: { port: PORT },
  logging: logConfig,
  dataSources
});

module.exports = config;

function loadLogConfig() {
  if(fs.existsSync(path.join(__dirname, './logging.js'))) {
    return require('./logging')[ENV];
  }
}

function checkDebug() {
  if(process.env.NODE_ENV === 'production') {
    process.env.DEBUG = false;
  } else {
    process.env.DEBUG = true;
  }
}

checkDebug();