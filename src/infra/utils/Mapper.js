class Mapper  {
  
  constructor(config) {

    if (!config.domain) {
      throw new Error('Domain Entity is required');
    }

    this.domain = config.domain;
  }

  toEntity(rawData) {
    let entityProps = this.entityProps;
    let Domain = this.domain;
    
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
