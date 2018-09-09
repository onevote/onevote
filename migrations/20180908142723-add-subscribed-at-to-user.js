module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'subscribed_at',
      Sequelize.DATE
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'subscribed_at')
  }
}
