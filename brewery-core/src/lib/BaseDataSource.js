const Event = require('./Event');

class BaseDataSource extends Event {

  static setConnector(connector, config) {
    this.connector = connector;
    this.connectorConfig = config;
  }

  static initConnector() {
    this.connector.initialize(this.connectorConfig);
  }
}

module.exports = BaseDataSource;