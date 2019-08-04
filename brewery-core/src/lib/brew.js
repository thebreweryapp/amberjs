/**
 * Import Awilix
 * */
const {
  createContainer,
  Lifetime,
  asClass,
  asFunction,
  asValue,
} = require('awilix');

const fs = require('fs');
const path = require('path');
const dataSourceFactory = require('./factories/dataSourceFactory');
const modelFactory = require('./factories/modelFactory');
const logger = require('./logger');
const server = require('./server');


/**
 * Loads configs from directories
 * @param {Array} sources 
 * @return {Array}
 */
const filesLoader = (sources) => {
  return sources.reduce((acc, sourceDir) => {
    fs.readdirSync(sourceDir)
      .forEach((file) => {
        const config = require(path.join(sourceDir, file));
        acc.push(config);
        return acc;
      });
  }, []); 
};

/**
 * Loads middlwares from directories
 * @param {Array} sources 
 * @return {Array}
 */
const middlewaresLoader = (sources) => {
  return sources.reduce((acc, sourceDir) => {
    fs.readdirSync(sourceDir)
      .forEach((file) => {
        acc[file] = require(path.join(sourceDir, file));
        return acc;
      });
  }, {}); 
};


/**
 * Build dataSources out of dataSource configs
 * @param {Array} dataSourceConfigs
 * @return {Array} Array of dataSources
 */
const buildDataSources = (dataSourceConfigs) => {
  return dataSourceConfigs.reduce((dataSources, dataSourceConfig) => {
    dataSources.push(dataSourceFactory(dataSourceConfig));
    return dataSources;
  }, []);
};

/**
 * Build model instances using modelConfig and their corresponding dataSource
 * @param {Object} modelConfigs 
 * @param {Array} dataSources 
 * 
 * @return {Object}
 */
const buildModels = (modelConfigs, dataSources) => {

  /** create object with dataSource name as key */
  const dataSourcesObj = dataSources.reduce((acc, val) => {
    if(val.name in acc) {
      throw new Error(`DataSource '${val.name} already exists'`);
    }
    acc[val.name] = val;
    return acc;
  }, {});

  const models = modelConfigs.map((modelConfig) => {
    const dataSourceName = modelConfig.dataSource;

    if(!(modelConfig.dataSource in dataSourcesObj)){
      throw new Error(`DataSource '${dataSourceName}' in model '${modelConfig.name}' doesn't exist`);
    }
    return modelFactory(modelConfig, dataSourcesObj[dataSourceName]);
  });

  return models;
};


const buildRepositories = (dir) => {
  const repositories = {};
  fs
    .readdirSync(`${process.env.PWD}/${dir}`)
    .forEach((file) => {
      const repositoryName = file.split('.')[0];
      const repository = require(`./${file}`);
      repositories[repositoryName.replace(/^./, f => f.toLowerCase())] = [repository, { lifetime: Lifetime.SINGLETON }];
    });

  return repositories;
};


/**
 * 
 * @param {Object} config
 * @property {Array} models array string of directories where models are located
 * @property {Array} dataSources array string of directories where dataSources config are located
 * 
 * @return {Object}
 */
const brew = (config) => {

  const router = require(config.router);

  
  const dataSourceConfigs = filesLoader(config.dataSources);
  const modelConfigs = filesLoader(config.models);
  
  // build dataSources
  const dataSources = buildDataSources(dataSourceConfigs);
  //  build models
  const models = buildModels(modelConfigs, dataSources);
  // build repositories
  const repositories = buildRepositories(config.repositories);

  // load middlewares
  const middlewares = middlewaresLoader(config.middlewares);


  // Create DI Container
  const container = createContainer();

  // System
  container
    .register({
      server: asClass(server, { lifetime: Lifetime.SINGLETON }),
      router: asFunction(router, { lifetime: Lifetime.SINGLETON }),
      logger: asFunction(logger, { lifetime: Lifetime.SINGLETON }),
      config: asValue(config),
    })

  // Middlewares
    .register(middlewares)

  // dataSources
    .register(dataSources)
  
  // Models
    .register(models)

  // Repositories
    .register(repositories);

  // use cases


  return {
    container,
    server: container.resolve('server')
  };
};

module.exports = brew;