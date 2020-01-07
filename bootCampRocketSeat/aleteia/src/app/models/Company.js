import Sequelize, { Model } from 'sequelize';

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: Sequelize.STRING,
        name: Sequelize.STRING,
        telephone: Sequelize.STRING,
        email: Sequelize.STRING,
        address: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Company;
