const { Event } = require('brewery-core');
const User = require('src/domain/User');

class CreateUser extends Event {
  constructor({ UserRepository }) {
    super();
    this.userRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const user = new User(data);

    try {
      const newUser = await this.UserRepository.add(user);

      this.emit(SUCCESS, newUser);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateUser;
    