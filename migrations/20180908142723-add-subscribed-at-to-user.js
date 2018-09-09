module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'subscribed_at',
      Sequelize.DATE
    )
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'subscribed_at')
  }
}
