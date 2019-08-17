const sqlConnector = require('brewery-sql-connector');

module.exports = {
  name: 'DbDatasource',
  connector : sqlConnector,
  config: {
    host : '127.0.0.1',
    username: 'root',
    password: '',
    database: 'brewery',
    dialect: 'mysql'
  }
};