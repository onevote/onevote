module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'wants_notifications')
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'wants_notifications',
      Sequelize.BOOLEAN
    )
  }
}
