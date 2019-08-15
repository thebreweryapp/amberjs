const { Event } = require('brewery-core');

class ListUsers extends Event {
  constructor({ UserRepository }) {
    super();
    this.userRepository = UserRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const users = await this.UserRepository.getAll({});

      this.emit(SUCCESS, users);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

ListUsers.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListUsers;
    