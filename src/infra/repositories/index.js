const fs = require('fs');
const { Lifetime } = require('awilix');

const repositories = {};
fs
  .readdirSync(`${process.env.PWD}/src/infra/repositories`)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const repositoryName = file.split('.')[0];
    const repository = require(`./${file}`)
    repositories[repositoryName.replace(/^./, f => f.toLowerCase())] = [repository, { lifetime: Lifetime.SINGLETON }];
  });


module.exports = repositories;
