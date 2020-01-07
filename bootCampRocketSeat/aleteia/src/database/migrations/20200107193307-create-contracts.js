module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contracts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sei: {
        type: Sequelize.STRING,
      },
      qtd_pf_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      preco_unit_pf: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      preco_total_contrato: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: { model: 'companies', key: 'id' },
        onUpdate: 'CASCADE',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('contracts');
  },
};
