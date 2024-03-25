'use strict';
const {
  Model, where
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
    static Outscan({id}){
      return this.update(
        {
          Outtime: new Date(),
          checkout: true
        },{
          where:{
            OutpassId: id,
          }
        }
      );
    }
    static scanned({id}){
      return this.create(
        {
          OutpassId: id,
          checkIn: false,
          checkout:false
        }
      );
    }
    static Inscan({id}){
      return this.update(
        {
          intime: new Date(),
          checkIn: true
        },{
          where:{
            OutpassId: id,
          }
        }
      );
    }
  }
  ScannedOutpasses.init({
    OutpassId: DataTypes.INTEGER,
    Outtime: DataTypes.DATE,
    intime: DataTypes.DATE,
    checkout: DataTypes.BOOLEAN,
    checkIn: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ScannedOutpasses',
  });
  return ScannedOutpasses;
};