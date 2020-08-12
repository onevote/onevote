module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      subscribed_at: {
        type: DataTypes.DATE,
        defaultValue: null
      }
    },
    {
      tableName: 'users',
      underscored: true
    }
  )
  User.associate = models => {
    User.belongsToMany(models.Candidate, {
      through: models.CandidateSelection,
      foreignKey: {
        name: 'user_id',
        allowNull: false
      },
      as: 'users'
    })
  }

  return User
}
