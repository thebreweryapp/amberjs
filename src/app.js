const { brew } = require('brewery-core');
const config = require('config');

const { server } = brew(config);

server
  .start()
  .catch((error) => {
    server.logger.error(error.stack);
    process.exit();
  });