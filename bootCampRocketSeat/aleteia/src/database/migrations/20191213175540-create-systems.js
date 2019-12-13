module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('systems', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      responsavel: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      fronteira: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      linguagem: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('systems');
  },
};
