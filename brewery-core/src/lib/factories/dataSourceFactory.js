/**
 * 
 * @param {Object} config
 * @property {*} connector instance of type connector or name(string) of connector
 * @property 
 */
const dataSourceFactory = ({ name, connector, config }) => {
  
  const dataSource = connector.initialize(config);

  connector.connect().then(() => console.log(`DataSource ${name} has successfully established connection!`))
    .catch((err) => { console.log(`DataSource ${name} has failed to establish connection!`);});
    
  return dataSource;
};

module.exports = dataSourceFactory;