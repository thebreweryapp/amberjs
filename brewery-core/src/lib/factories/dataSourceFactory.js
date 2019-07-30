const BaseDataSource = require('../BaseDataSource');

/**
 * 
 * @param {Object} config
 * @property {*} connector instance of type connector or name(string) of connector
 * @property 
 */
const DataSourceFactory = ({ name, connector, config }) => {

  const DataSource = Object.create(BaseDataSource);

  DataSource.name = name;
  DataSource.setConnector(connector, config);

  return DataSource;
};

module.exports = DataSourceFactory;