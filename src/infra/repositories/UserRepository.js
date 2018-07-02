const BaseRepository = require('./BaseRepository');
const User = require('src/domain/user/User');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {

    super(UserModel, User);
  }

}

module.exports = UserRepository;
