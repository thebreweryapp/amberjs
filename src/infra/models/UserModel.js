const { Model } = require('brewery-core');

const userSchema = {
  name: 'User',
  properties: {
    id: {
      type: Number
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    }
  },
  relations: {
    
  }
};


module.exports = ({ dbDataSource }) => {
  class UserModel extends Model{}
  UserModel.init(userSchema, dbDataSource);
  return UserModel;
};