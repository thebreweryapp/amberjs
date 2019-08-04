module.exports = {
  name: 'node-api-boilerplate',
  env: process.env.NODE_ENV,
  debug: process.env.DEBUG,
  app: [
    'src/app'
  ],
  dataSources: [
    'src/infra/dataSources'
  ],
  models: [
    'src/infra/models'
  ],
  repositories: [
    'src/infra/repositories'
  ],
  middlewares: [
    'src/interfaces/http/middlewares'
  ],
  router: 'src/interfaces/router.js'
};