import Sequelize, { Model } from 'sequelize';

class System extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        responsavel: Sequelize.STRING,
        fronteira: Sequelize.STRING,
        linguagem: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default System;
