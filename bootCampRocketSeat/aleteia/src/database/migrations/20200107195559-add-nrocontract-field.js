module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('contracts', 'numero_contrato', {
      type: Sequelize.STRING,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('contracts', 'numero_contrato');
  },
};
