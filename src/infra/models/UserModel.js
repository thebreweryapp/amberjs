const User = {
  name: 'User',
  dataSource: 'db',
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
    type: 'belongsTo',
    model: 'Group',
    foreignKey: 'groupId'
  }
};

module.exports = User;


// module.exports = ({ dbDataSource }) => {
//   class UserModel extends Model{}
//   UserModel.init(userSchema, dbDataSource);
//   return UserModel;
// };