const { Router } = require('express');
const BaseController = require('./BaseController');

class UsersController extends BaseController {
  
  constructor() {
    super();
    const router = Router();
    
    router.get('/', this.injector('getAllUsers'), this.index);
    router.get('/:id', this.injector('getUser'), this.show);
    router.post('/', this.injector('createUser'), this.create);
    router.put('/:id', this.injector('updateUser'), this.update);
    router.delete('/:id', this.injector('deleteUser'), this.delete);

    return router;
  }

  



}

module.exports = UsersController;
