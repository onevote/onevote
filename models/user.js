module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      candidates: DataTypes.JSONB
    },
    {
      tableName: 'users',
      underscored: true
    }
  )

  return User
}
