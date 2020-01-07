import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import System from '../app/models/System';
import Demand from '../app/models/Demand';
import Count from '../app/models/Count';
import Company from '../app/models/Company';

import databaseConfig from '../config/database';

const models = [User, File, System, Demand, Count, Company];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
