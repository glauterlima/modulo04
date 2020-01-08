import Sequelize, { Model } from 'sequelize';

class Lot extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        date: Sequelize.DATE,
        observacao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Contract, {
      foreignKey: 'contract_id',
      as: 'contract',
    });
    this.belongsTo(models.Demand, {
      foreignKey: 'demand_id',
      as: 'demand',
    });
  }
}
export default Lot;
