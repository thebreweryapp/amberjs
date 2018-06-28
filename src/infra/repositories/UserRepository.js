const { Mapper } = require('../utils');
const BaseRepository = require('./BaseRepository');
const User = require('src/domain/user/User');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    
    // Create DB to Domain entity mapper
    const UserMapper = new Mapper({
      domain: User,
      entityProps: ['id', 'name'],
      dbProps: ['name']
    });

    super(UserModel, UserMapper);
  }

}


module.exports = UserRepository;
