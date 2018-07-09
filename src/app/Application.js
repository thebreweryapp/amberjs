class Application {
  constructor({ server, database, logger }) {
    this.server = server;
    this.database = database;
    this.logger = logger;

    if(database && database.options.logging) {
      database.options.logging = logger.info.bind(logger);
    }
  }

  async start() {
    if(this.database) {
      try {
        await this.database.authenticate();
      } catch (e) {
        this.logger.error(e);
      }
    }

    await this.server.start();
  }
}

module.exports = Application;
