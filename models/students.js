'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static findStudentByUserId(id){
      return this.findOne({
        where:{
          userId: id,
        }
      })
    }
  }
  
  Students.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    college: DataTypes.STRING,
    mobile: DataTypes.STRING,
    address: DataTypes.STRING,
    parentcontact: DataTypes.STRING,
    currentyear: DataTypes.STRING,
    branch: DataTypes.STRING,
    photo: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Students',
  });
  return Students;
};