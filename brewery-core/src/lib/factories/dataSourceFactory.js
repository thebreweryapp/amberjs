const BaseDataSource = require('../BaseDataSource');

/**
 * 
 * @param {Object} config
 * @property {*} connector instance of type connector or name(string) of connector
 * @property 
 */
const dataSourceFactory = ({ name, connector, config }) => {

  const DataSource = Object.create(BaseDataSource);

  Object.defineProperty(DataSource, 'name', { value: name });
  DataSource.setConnector(connector, config);

  return DataSource;
};

module.exports = dataSourceFactory;