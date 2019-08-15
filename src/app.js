const { brew } = require('brewery-core');
const config = require('config');


const express = require('express');

const { server, container } = brew(config);

server
  .start()
  .catch((error) => {
    server.logger.error(error.stack);
    process.exit();
  });

// const app = express();
// app.disable('x-powered-by');
// app.use(container.resolve('router'));
// app.listen(3000, () => {
//   console.log('listening to portangina');
// });