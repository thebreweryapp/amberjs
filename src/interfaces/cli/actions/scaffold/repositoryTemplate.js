const firstToUpper = (str) => {
  return str.replace(/^./, f => f.toUpperCase());
};

const createRepository = (model) => {
  const upperSingular = firstToUpper(model.singular);
  const upperPlural = firstToUpper(model.plural);
  const lowerPlural = model.plural;
  const lowerSingular = model.singular;
  const modelName = upperSingular + 'Model';

  const repository =
`const ${upperSingular}Mapper = require('./mappers/Sequelize${upperSingular}Mapper');

class ${upperSingular}Repository {
  constructor({ ${modelName} }) {
    this.${modelName} = ${modelName};
  }

  async getAll(...args) {
    const ${lowerPlural} = await this.${modelName}.findAll(...args);

    return ${lowerPlural}.map(${upperSingular}Mapper.toEntity);
  }

  async getById(id) {
    const ${lowerSingular} = await this._getById(id);

    return ${upperSingular}Mapper.toEntity(${lowerSingular});
  }

  async add(${lowerSingular}) {
    const { valid, errors } = ${lowerSingular}.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const new${upperSingular} = await this.${modelName}.create(${upperSingular}Mapper.toDatabase(${lowerSingular}));
    return ${upperSingular}Mapper.toEntity(new${upperSingular});
  }

  async remove(id) {
    const ${lowerSingular} = await this._getById(id);

    await ${lowerSingular}.destroy();
    return;
  }

  async update(id, newData) {
    const ${lowerSingular} = await this._getById(id);

    const transaction = await this.${modelName}.sequelize.transaction();

    try {
      const updated${upperSingular} = await ${lowerSingular}.update(newData, { transaction });
      const ${lowerSingular}Entity = ${upperSingular}Mapper.toEntity(updated${upperSingular});

      const { valid, errors } = ${lowerSingular}Entity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return ${lowerSingular}Entity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.${modelName}.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.${modelName}.findById(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = \`${upperSingular} with id \${id} can't be found.\`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = ${upperSingular}Repository;
`;

  return repository;
};

module.exports = createRepository;