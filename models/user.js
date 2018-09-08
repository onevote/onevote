module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      candidates: DataTypes.ARRAY,
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

  return User
}
