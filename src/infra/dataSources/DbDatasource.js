const { DataSource } = require('brewery-core');

module.exports = ({ config }) => {
  return new DataSource(config.dataSources['dbSql']);
};