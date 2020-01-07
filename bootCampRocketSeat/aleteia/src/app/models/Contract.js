import Sequelize, { Model } from 'sequelize';

class Contract extends Model {
  static init(sequelize) {
    super.init(
      {
        numero_contrato: Sequelize.STRING /** Número do contrato */,
        sei: Sequelize.STRING /** Número do processo no SEI */,
        vigencia: Sequelize.NUMBER /** Vigência do contrato */,
        qtd_pf_total:
          Sequelize.NUMBER /** Quantidade total de PF acordado no contrato */,
        preco_unit_pf:
          Sequelize.DECIMAL /* Preço unitário do Ponto de Função */,
        preco_total_contrato: Sequelize.DECIMAL /** Preço total do contrato */,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
  }
}
export default Contract;
