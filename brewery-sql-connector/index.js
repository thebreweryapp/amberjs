const Sequelize = require('sequelize');
const { ConnectorFactory } = require('brewery-connector');
const sequelizeModelBuilder = require('./sequelizeModelBuilder');
const configValidator = require('./configValidator');

/**
 * 
 * @param {Object} config Connector config object
 */
const initialize = (config) => {
  /** validate config input */
  const { isValid, errors } = configValidator(config);
  if(!isValid) {
    throw new Error('Invalid config');
  }

  /** create sequelize instance */
  this.sequelize = new Sequelize(config);
  this.emit('initialized', {});
};

/**
 * Connect to service
 */
const connect = () => {

};

/**
 * Disconnect from service
 */
const disconnect = () => {

};


/**
 * get operations available for a model
 * 
 * @param {Object} schema model schema 
 * @return {Object} model operations
 */
const decorateModel = (breweryModel) => {

  const sequelizeModel = sequelizeModelBuilder(this.sequelize, breweryModel);

    return {
      create: (data) => sequelizeModel.create(data),
      update: async (id, newData) => {
        const entity = await this._getById(id);
        const transaction = await this.sequelizeModel.sequelize.transaction();

        try {
          const updatedEntity = await entity.update(newData, { transaction });
          await transaction.commit();
          return updatedEntity;
        } catch(error) {
          await transaction.rollback();
          throw error;
        }

      },
      delete: async (id) => {
        const entity = await this._getById(id);
        await entity.destroy();
        return;
      },
      get: (id) => sequelizeModel.findById(id, { rejectionOnEmpty: true }),
      getAll: (args) => sequelizeModel.findAll(args)

    };
  }

};



const SqlConnector = ConnectorFactory(initialize, connect, disconnect, decorateModel);

class SqlConnector extends Connector {
  constructor() {
    super();
    this.configReqs = {

    };
  }

  /**
   * 
   * @param {Object} config Connector config object
   */
  initialize(config) {

    /** validate config input */
    const { isValid, errors } = configValidator(config);
    if(!isValid) {
      throw new Error('Invalid config');
    }

    /** create sequelize instance */
    this.sequelize = new Sequelize(config);
    this.emit('initialized', {});
  }

  /**
   * @return {boolean} returns whether connector successfully connected to the service or not
   */
  async connect() {
    try {
      await this.sequelize.authenticate();
      this.emit('connected', {});
    } catch(e){
      console.log(e);
      return false;
    }
  }

  /**
   * Disconnect from service
   */
  disconnect() {

  }

  /**
   * Ping connector service
   */
  ping() {

  }

  /**
   * get operations available for a model
   * 
   * @param {Object} schema model schema 
   * @return {Object} model operations
   */
  getOperations(schema) {

    const sequelizeModel = sequelizeModelBuilder(schema);

    return {
      create: (data) => this.sequelizeModel.create(data),
      update: async (id, newData) => {
        const entity = await this._getById(id);
        const transaction = await this.sequelizeModel.sequelize.transaction();

        try {
          const updatedEntity = await entity.update(newData, { transaction });
          await transaction.commit();
          return updatedEntity;
        } catch(error) {
          await transaction.rollback();
          throw error;
        }

      },
      delete: async (id) => {
        const entity = await this._getById(id);
        await entity.destroy();
        return;
      },
      get: (id) => sequelizeModel.findById(id, { rejectionOnEmpty: true }),
      getAll: (args) => sequelizeModel.findAll(args)

    };
  }
}

module.exports = SqlConnector;