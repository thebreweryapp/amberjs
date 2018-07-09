class BaseRepository {
  constructor(model, domain) {
    this.model = model;
    this.domain = domain;
  }

  async getAll(...args) {
    const results = await this.model.findAll(...args);

    return results.map(result => new this.domain(result));
  }

  async getById(id) {
    const result = await this._getById(id);

    return new this.domain(result);
  }

  async add(entity) {
    const { valid, errors } = entity.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newEntity = await this.model.create(entity.toJSON());
    return new this.domain(newEntity);
  }

  async remove(id) {
    const entity = await this._getById(id);

    await entity.destroy();
    return;
  }

  async update(id, newData) {
    const entity = await this._getById(id);

    const transaction = await this.model.sequelize.transaction();

    try {
      const updatedEntity = await entity.update(newData, { transaction });
      const domainEntity = new this.domain(updatedEntity);

      const { valid, errors } = domainEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return domainEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.model.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.model.findById(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `${this.model.name} with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = BaseRepository;
