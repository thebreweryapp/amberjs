var SequelizeAuto = require('sequelize-auto');
const fs = require('fs');
const inflection = require( 'inflection' );
const createRepository = require('./repositoryTemplate');
const config = require('config').db;
const { models } = require('src/infra/database/models');

const scaffoldModels = async() => {

  var auto = new SequelizeAuto(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    directory: `${process.env.PWD}/src/infra/database/models`, 
    port: '3306',
    camelCase: true,
    skipTables: ['SequelizeMeta'],
    additional: {
      timestamps: true
    }
  });

  auto.run(err => {
    if (err) throw err;
  });

  return;
};


const scaffoldRepositories = async() => {
  const models = [];

  fs
    .readdirSync(`${process.env.PWD}/src/infra/database/models`)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      models.push({
        plural: file.split('.')[0],
        singular: inflection.singularize(file.split('.')[0]),
      });
    });
    
  models.forEach((model) => {
    const repository = createRepository(model);
    const path = `${process.env.PWD}/src/infra/repositories`;
    const fileName = `${firstToUpper(model.singular)}Repository.js`;
    
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      fs.chmodSync(path, '0775');
    }

    fs.writeFile(`${path}/${fileName}`, repository, (err) => {  
      if (err) throw err;
      console.log(`${fileName} created!`);
    });

  });

  return;
};

const firstToUpper = (str) => {
  return str.replace(/^./, f => f.toUpperCase());
};


const scaffoldMappers = async() => {

};



const scaffold = async(config, command, subCommand) => {
  command.options.forEach((value, index) => {
    if(value.name == '--withModels') {
      scaffoldModels();
    }

    if(value.name == '--withRepositories') {
      scaffoldRepositories();
    }

    if(value.name == '--withMappers') {
      scaffoldMappers();
    }
  });
};


module.exports = scaffold;