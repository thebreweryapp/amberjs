const { Router, static } = require('express');
const statusMonitor = require('express-status-monitor');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const controller = require('./utils/createControllerRoutes');
const path = require('path');

module.exports = ({ config, containerMiddleware, loggerMiddleware, errorHandler, swaggerMiddleware }) => {
  const router = Router();

  /* istanbul ignore if */
  if(config.env === 'development') {
    router.use(statusMonitor());
  }

  /* istanbul ignore if */
  if(config.env !== 'test') {
    router.use(loggerMiddleware);
  }

  router
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors())
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware);

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  router.use('/api', controller('express-handler'));
  router.use('/', static(path.join(__dirname, './public')));

  router.use(errorHandler);

  return router;
};
