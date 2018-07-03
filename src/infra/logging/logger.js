const logger = require('brewery-log');

module.exports = ({ config }) => {
  logger.initLogger(config.logging);

  return logger;
};
