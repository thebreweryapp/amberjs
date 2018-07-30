module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    id : {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },name : {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'Users',
    timestamps: true
  });
};