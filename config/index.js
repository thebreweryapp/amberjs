require('dotenv').load();

const fs = require('fs');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const dbConfig = loadDbConfig();
const logConfig = loadLogConfig();

const config = Object.assign({
  [ENV]: true,
  env: ENV,
  web: { port: PORT },
  db: dbConfig,
  logging: logConfig,
});

module.exports = config;

function loadDbConfig() {
  if(process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if(fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV];
  }
}

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