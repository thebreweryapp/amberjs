const Connector = require('./Connector');

class DataSource {
  constructor(config) {
    const connector = this.getConnector(config.connector);
    connector.initialize(config);
    const connected = connector.connect();
    if (connected) {
      console.log(`DataSource ${config.name} has successfully established connection`);
    } else {
      console.log(`DataSource ${config.name} has failed to established connection`);
    }

    this.connector = connector;
    return this;
  }

  /**
   * 
   * @param {*} connector string connector name or type connector class
   * @return {object} class of type connector
   */
  static getConnector(connector) {

    if(typeof connector == Connector) {
      return connector;
    }

    switch(connector){
    case 'sql':
      return require('brewery-sql-connector');
    default:
      throw new Error(`Invalid connector ${connector}. Connector must be a valid default connector or a Class of type 'Connector'`);
    }

  }
}



module.exports = DataSource;