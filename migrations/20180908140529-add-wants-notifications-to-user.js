module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'wants_notifications',
      Sequelize.BOOLEAN
    )
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'wants_notifications')
  }
}
