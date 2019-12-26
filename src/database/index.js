import Sequelize from 'sequelize';

import { User, Student } from '../app/models';

import databaseConfig from '../config/database';

const models = [User, Student];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
