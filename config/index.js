const appConfigs = require('./app');
const connector = require('./connector');
const logging = require('./logging');

module.exports = {
  app: appConfigs,
  connector,
  logging
};