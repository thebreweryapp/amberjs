const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const ExpressHandler = {
  get router() {
    const router = Router();

    // check if operation exists
    const validator = (req, res, next) => {
      try {
        req.container.resolve(req.params.operation);
        next();
      } catch(error) {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      }
    };

    // dynamically inject operation based on operation request parameter
    const injector = (req, res, next) => {
      req[req.params.operation] = req.container.resolve(req.params.operation);
      next();
    };

    // generic route
    router.post('/:service/:operation', validator, injector, this.handler);

    return router;
  },

  // generic handler
  handler(req, res, next) {

    const serviceName = req.params.service;
    const operationName = req.params.operation;

    const operation = req[operationName];

    operation
      .on('SUCCESS', (result) => {
        res
          .status(Status.OK)
          .json(result); // do i have to serialize?
      })
      .on('VALIDATION_ERROR', (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on('NOT_FOUND', (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on('ERROR', next);

    operation.execute(req.body);
  },

};

module.exports = ExpressHandler;
