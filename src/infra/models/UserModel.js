
module.exports = ({ DbDataSource }) => {
  return DbDataSource.define('Users', {
    id : {
      primaryKey: true,
      autoIncrement: true,
      type: DbDataSource.INTEGER,
    }, name : {
      type: DbDataSource.STRING,
    },
  }, {
    tableName: 'Users',
    timestamps: true
  });
};