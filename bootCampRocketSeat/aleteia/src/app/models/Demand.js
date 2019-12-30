import Sequelize, { Model } from 'sequelize';

class Demand extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        type: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.System, { foreignKey: 'system_id', as: 'system' });
  }
}
export default Demand;
