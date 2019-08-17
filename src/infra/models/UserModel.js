
module.exports = ({ DbDatasource }) => {
  const DataTypes = DbDatasource.DataTypes;
  return DbDatasource.define('Users', {
    id : {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    }, name : {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'Users',
    timestamps: true
  });
};