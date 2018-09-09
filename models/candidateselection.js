module.exports = (sequelize, DataTypes) => {
  const CandidateSelection = sequelize.define(
    'CandidateSelection',
    {
      user_id: DataTypes.INTEGER,
      candidate_id: DataTypes.INTEGER
    },
    {
      tableName: 'candidate_selections',
      underscored: true
    }
  )

  return CandidateSelection
}
