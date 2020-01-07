module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('contracts', 'vigencia', {
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('contracts', 'vigencia');
  },
};
