'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Report.belongsTo(models.User, { foreignKey: 'userId' });
      Report.belongsTo(models.Subject, { foreignKey: 'subjectId' });
      Report.belongsTo(models.Chapter, { foreignKey: 'chapterId' });
    }
  }
  Report.init(
    {
      userId: DataTypes.STRING,
      subjectId: DataTypes.STRING,
      chapterId: DataTypes.STRING,
      grade: DataTypes.INTEGER,
      score: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Report'
    }
  );
  return Report;
};
