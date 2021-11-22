'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chapter.hasMany(models.Report, { foreignKey: 'chapterId' });
      Chapter.belongsTo(models.Subject, { foreignKey: 'subjectId' });
    }
  }
  Chapter.init(
    {
      subjectId: DataTypes.STRING,
      grade: DataTypes.INTEGER,
      score: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Chapter'
    }
  );
  return Chapter;
};
