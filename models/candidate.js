module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define(
    'Candidate',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      state: DataTypes.STRING,
      position: DataTypes.STRING,
      party: DataTypes.STRING,
      image_url: DataTypes.STRING
    },
    {
      tableName: 'candidates',
      underscored: true
    }
  )

  return Candidate
}
