
const { Router } = require('express');
const BaseController = require('./BaseController');

class UsersController extends BaseController {
  
  constructor() {
    super();
    const router = Router();
    router.get('/', this.injector('listUsers'), this.index);
    router.post('/', this.injector('createUser'), this.create);
    router.get('/:id', this.injector('showUser'), this.show);
    router.put('/:id', this.injector('updateUser'), this.update);
    router.delete('/:id', this.injector('deleteUser'), this.delete);

    return router;
  }
}

module.exports = UsersController;