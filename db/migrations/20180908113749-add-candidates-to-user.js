module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'candidates',
      Sequelize.ARRAY(Sequelize.JSONB)
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'candidates')
  }
}
