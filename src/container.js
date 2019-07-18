const userOperations = require('./app/user');
const { createContainer, Lifetime } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');

const serializer = require('./interfaces/http/utils/serializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');

const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');

const repositories = require('./infra/repositories');
const { database, models } = require('./infra/database/models');

const { logger, loggerMiddleware, openApiMiddleware } = require('brewery-core');

const container = createContainer();

module.exports = container;

// System
container
  .registerClass({
    app: [Application, { lifetime: Lifetime.SINGLETON }],
    server: [Server, { lifetime: Lifetime.SINGLETON }]
  })
  .registerFunction({
    router: [router, { lifetime: Lifetime.SINGLETON }],
    logger: [logger, { lifetime: Lifetime.SINGLETON }]
  })
  .registerValue({ config });

// Middlewares
container
  .registerFunction({
    loggerMiddleware: [loggerMiddleware, { lifetime: Lifetime.SINGLETON }],
    openApiMiddleware: [openApiMiddleware]
  })
  .registerValue({
    containerMiddleware: scopePerRequest(container),
    errorHandler: config.production ? errorHandler : devErrorHandler,
  });

// Repositories
container.registerClass(repositories);

// Database
container.registerValue(models);
container.registerValue({database});

// serializer
container.registerValue({
  serializer
});

// Operations
container.registerClass(userOperations);
