'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static findStudentByUserId(id){
  return this.findAll({
    where:{
      id: id,
    }
  })
}
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    college: DataTypes.STRING,
    mobile: DataTypes.STRING,
    address: DataTypes.STRING,
    parentcontact: DataTypes.STRING,
    currentyear: DataTypes.STRING,
    branch: DataTypes.STRING,
    photo: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};