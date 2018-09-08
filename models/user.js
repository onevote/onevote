module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      candidates: DataTypes.JSONB,
      wants_notifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName: 'users',
      underscored: true
    }
  )

  return User
}
