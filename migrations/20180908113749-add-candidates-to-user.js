module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'candidates',
      Sequelize.ARRAY(Sequelize.JSONB)
    )
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'candidates')
  }
}
