const Status = require('http-status');
const Serializer = require('../utils/serializer');

class BaseController {

  constructor(properties) {
    this.serialize = new Serializer(properties);

    // dynamically inject operation based on operation request parameter
    this.injector = operation => (req, res, next) => {
      req[req.params.operation] = req.container.resolve(operation);
      next();
    };

  }

  index(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR } = operation.outputs;


    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json(result.map(this.serialize));
      })
      .on(ERROR, next);

    operation.execute();
  }

  show(req, res, next) {
    const { operation } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = operation.outputs;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.OK)
          .json(this.serialize(result));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute(Number(req.params.id));
  }

  create(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.outputs;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.CREATED)
          .json(this.serialize(result));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute(req.body);
  }

  update(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = operation.outputs;

    operation
      .on(SUCCESS, (result) => {
        res
          .status(Status.ACCEPTED)
          .json(this.serialize(result));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute(Number(req.params.id), req.body);
  }

  delete(req, res, next) {
    const { operation } = req;
    const { SUCCESS, ERROR,  NOT_FOUND } = operation.outputs;

    operation
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    operation.execute(Number(req.params.id));
  }
}

module.exports = BaseController;
