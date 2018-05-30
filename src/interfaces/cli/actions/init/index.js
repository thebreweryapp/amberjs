const inquirer = require('inquirer');
const fs = require('fs');


const init = async(config, command, subCommand) => {

  const questions = [
    {
      type: 'rawlist',
      name: 'database',
      message: 'Choose database to use:',
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
      name: 'connString',
      message: 'Input database connection string'
    }
  ];

  const answers = await inquirer.prompt(questions);  
	
  fs.writeFile(`${process.env.PWD}/config/database.js`, lyrics, (err) => {  
    if (err) throw err;
    
    console.log('Lyric saved!');
  });

 
};

module.exports = init;