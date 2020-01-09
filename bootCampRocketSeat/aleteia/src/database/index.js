import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import System from '../app/models/System';
import Demand from '../app/models/Demand';
import Count from '../app/models/Count';
import Company from '../app/models/Company';
import Contract from '../app/models/Contract';

import databaseConfig from '../config/database';

const models = [User, File, System, Demand, Count, Company, Contract];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/aleteia',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
