const { brew } = require('brewery-core');
const config = require('app-config.json');

const app = brew(config);

module.exports = app;