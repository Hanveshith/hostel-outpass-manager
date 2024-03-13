'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScannedOutpasses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static scanned({id}){
      return this.create(
        {
          fOutpassId: id,
          Outtime: new Date(),
        }
      );
    }
  }
  ScannedOutpasses.init({
    fOutpassId: DataTypes.INTEGER,
    Outtime: DataTypes.DATE,
    intime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ScannedOutpasses',
  });
  return ScannedOutpasses;
};