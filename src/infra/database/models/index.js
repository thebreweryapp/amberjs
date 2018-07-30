const { ModelsLoader } = require('src/infra/sequelize');
const Sequelize = require('sequelize');
const config = require('config').db;

if(config) {
  const sequelize = new Sequelize(config);
  const { models, database } = ModelsLoader.load({
    sequelize,
    baseFolder: __dirname
  });
  
  module.exports = {
    sequelize,
    models,
    database
  };
  
  
} else {
  /* eslint-disable no-console */
  console.error('Database config file log found, disabling database.');
  /* eslint-enable no-console */
}

