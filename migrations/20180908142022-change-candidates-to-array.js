module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('users', 'candidates', Sequelize.ARRAY)
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('users', 'candidates', Sequelize.JSONB)
  }
}
