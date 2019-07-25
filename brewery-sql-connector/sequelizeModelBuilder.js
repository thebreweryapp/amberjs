
/**
 * Map Brewery schema to sequelize attributes
 * @param {*} properties 
 * @return {Object} sequelize attributes
 */
const toSequelizeMapper = (properties) => {

};


/**
 * 
 * @param {Object} schema 
 * @return {Object} sequelize instance
 */
const createSequelizeModel = (sequelize, { name, properties }) => {

  const sequelizeAttr = toSequelizeMapper(properties);

  return this.sequelize.define(name, sequelizeAttr);
};



module.exports = createSequelizeModel;