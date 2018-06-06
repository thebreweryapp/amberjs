const inquirer = require('inquirer');
const fs = require('fs');


const init = async(config, command, subCommand) => {

  const questions = [
    {
      type: 'rawlist',
      name: 'dialect',
      message: 'Choose database dialect:',
      choices: [
        'mysql',
        'postgres',
        'mongodb',
        'sqlite',
        'sqlserver'
      ]     
    },
    {
      type: 'input',
      name: 'username',
      message: 'username:'
    },
    {
      type: 'input',
      name: 'password',
      message: 'password:'
    },
    {
      type: 'input',
      name: 'database',
      message: 'database/schema name:'
    },
    {
      type: 'input',
      name: 'host',
      message: 'host:'
    }
  ];

  const answers = await inquirer.prompt(questions);  

  const dbConfig = `
module.exports = {
  development: {
    username:  '${answers.username}',
    password: '${answers.password}',
    database: '${answers.database}',
    host: '${answers.host}',
    dialect: '${answers.dialect}'
  },
  test: {
    username: '${answers.username}',
    password: '${answers.password}',
    database: '${answers.database}',
    host: '${answers.host}',
    dialect: '${answers.dialect}',
    logging: null
  },
  production: process.env.DATABASE_URL
};
  `;
	
  fs.writeFile(`${process.env.PWD}/config/database.js`, dbConfig, (err) => {  
    if (err) throw err;
    console.log('Database connection saved!');
  });

 
};

module.exports = init;