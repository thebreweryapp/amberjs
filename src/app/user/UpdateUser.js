const { Event } = require('brewery-core');

class UpdateUser extends Event {
  constructor({ UserRepository }) {
    super();
    this.userRepository = UserRepository;
  }

  async execute(id, data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.outputs;

    try {
      const user = await this.UserRepository.update(id, data);
      this.emit(SUCCESS, user);
    } catch(error) {
      switch(error.message) {
      case 'ValidationError':
        return this.emit(VALIDATION_ERROR, error);
      case 'NotFoundError':
        return this.emit(NOT_FOUND, error);
      default:
        this.emit(ERROR, error);
      }
    }
  }
}

UpdateUser.setEvents(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = UpdateUser; 
    