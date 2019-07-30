module.exports = {
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