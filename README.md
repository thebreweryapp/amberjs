## Overview

AmberJS is a Node.js framework based on Express that enables you to quickly create APIs and microservices composed from backend systems such as databases, REST, and GraphQL services.

## Features

<dl>
<dt>Multilayer folder structure</dt>

Code organization inspired by DDD and Clean Architecture focused on codebase scalability.

<dt>Instant feedback and reload</dt>

Use Nodemon to automatically reload the server after a file change when on development mode, makes the development faster and easier.

<dt>Ready for production</dt>

Setup with PM2 process manager ready to go live on production. It's also out-of-box ready to be deployed at Heroku, you can read more about it here.

<dt>Scalable and easy to use web server</dt>

Use Express for requests routing and middlewares. There are some essential middlewares for web APIs already setup, like body-parser, compression, CORS and method-override.

<dt>Database integration</dt>

Sequelize, an ORM for SQL databases, is already integrated, you just have to set the authentication configurations.

<dt>Prepared for testing</dt>

The test suite uses Mocha/Chai and is prepared to run unit, integration and functional tests right from the beginning.

<dt>Dependency injection</dt>

With Awilix, a practical dependency injection library, the code will not be coupled and it'll still be easy to resolve automatically the dependencies on the runtime and mock them during the tests. It's even possible inject dependencies on your controllers with the Awilix Express adapter. Click here if you want to read more about how to use dependency injection with this boilerplate.

<dt>CLI integration</dt>

Both the application and Sequelize have command-line tools to make it easy to work with them. Check the CLI section to know more about this feature.

## Prerequisites
First, you’ll need to install a supported version of Node:
- Node.js at v8.9 or greater
- We recommend to use NVM (node version manager)

Additionally, this guide assumes that you are comfortable with certain technologies, languages and concepts.
- JavaScript (ES6)
- REST

Lastly, you’ll need to install the Brewery CLI toolkit:

```npm i -g @brewery/cli```

For more info, see [The AmberJS documentation](https://docs.thebrewery.dev/amberjs/getting-started)

## Tech

- [Node v8.10+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Awilix](https://www.npmjs.com/package/awilix)
- [Structure](https://www.npmjs.com/package/structure)
- [HTTP Status](https://www.npmjs.com/package/http-status)
- [Express Status Monitor](https://www.npmjs.com/package/express-status-monitor)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [PM2](https://www.npmjs.com/package/pm2)
- [Mocha](https://www.npmjs.com/package/mocha)
- [Chai](https://www.npmjs.com/package/chai)
- [FactoryGirl](https://www.npmjs.com/package/factory-girl)
- [Istanbul](https://www.npmjs.com/package/istanbul) + [NYC](https://www.npmjs.com/package/nyc)
- [ESLint](https://www.npmjs.com/package/eslint)

## Acknowledgement

This boilerplate is forked and modified from [node-api-boilerplate](https://github.com/talyssonoc/node-api-boilerplate) - [Talysson de Oliveira Cassiano](https://github.com/talyssonoc) :clap:



