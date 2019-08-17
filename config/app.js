require('dotenv').load();

module.exports = {
  name: 'node-api-boilerplate',
  env: process.env.NODE_ENV,
  debug: process.env.DEBUG,
  port: process.env.PORT,
  sources: { 
    app: [ 'src/app'],
    dataSource: ['src/infra/dataSources'],
    model: ['src/infra/models'],
    repository: ['src/infra/repositories'],
    middleware: ['src/interfaces/http/middlewares'],
    router: 'src/interfaces/http/router.js'
  }
};
