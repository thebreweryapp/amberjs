class Mapper  {
  
  constructor(config) {

    if (!config.domain) {
      throw new Error('Domain Entity is required');
    }

    if (!config.entityProps) {
      throw new Error('Entity properties are required');
    }

    if (!config.dbProps) {
      throw new Error('DB model properties are required');
    }

    this.domain = config.domain;
    this.entityProps = config.entityProps;
    this.dbProps = config.dbProps;
  }

  toEntity(rawData) {
    const entityProps = this.entityProps;
    const Domain = this.domain;
    
    let data = {
      rawData,
      entityData: {}
    };

    entityProps.reduce(this.entityReducer, data);

    return new Domain(data.entityData);
  }

  toEntityReducer(data, property) {
    if(data.rawData.hasOwnProperty(property)) {
      data.entityData[property] = data.rawData[property];
    } else {
      data.entityData[property] = null;
    }

    return data;
  }


  toDatabase(domainData) {
    const dbProps = this.dbProps;
    let data = {
      domainData,
      dbData: {}
    };
    dbProps.reduce(this.toDatabaseReducer, data);
    
    return data.dbData;
  }

  toDatabaseReducer(data, property) {
    if(data.domainData.hasOwnProperty(property)) {
      data.dbData[property] = data.domainData[property];
    } else {
      data.dbData[property] = null;
    }

    return data;
  }

}

module.exports = Mapper;
