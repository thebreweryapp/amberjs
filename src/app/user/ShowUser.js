const { Event } = require('brewery-core');

class ShowUser extends Event {
  constructor({ UserRepository }) {
    super();
    this.userRepository = UserRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const user = await this.UserRepository.getById(id);
      this.emit(SUCCESS, user);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ShowUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ShowUser;
    