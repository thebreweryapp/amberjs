const { BaseRepository } = require('brewery-core');
const User = require('src/domain/User');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {

    super(UserModel, User);
  }

}

module.exports = UserRepository;
