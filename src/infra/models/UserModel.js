module.exports = {
  name: 'UserModel',
  datasource: 'DbDatasource',
  definition: function(datasource, DataTypes) {
    return datasource.define('users', {
      id : {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      }, name : {
        type: DataTypes.STRING,
      }
    }, {
      tableName: 'users',
      timestamps: true,
      classMethods: {
        associate() {
          // associations can be defined here
        }
      }
    });
  }
};