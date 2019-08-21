require('dotenv').load();

module.exports = {
  /**
   * The name of the application
   */
  name: 'node-api-boilerplate',
  /**
   * The default environment
   */
  env: process.env.NODE_ENV,
  debug: process.env.DEBUG,
  port: process.env.PORT,
  sources: { 
    domain: ['src/domain'],
    app: ['src/app'],
    dataSource: ['src/infra/dataSources'],
    model: ['src/infra/models'],
    repository: ['src/infra/repositories'],
    middleware: ['src/interfaces/http/middlewares'],
    router: 'src/interfaces/http/router.js'
  },
};
