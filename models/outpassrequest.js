'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OutpassRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static findOutPassByUserId({userid}){
      return this.findAll({
        where:{
          userid: userid,
        }
      })
    }
    static findPendingOutpasses(){
      return this.findAll({
        where:{
          status: false,
        }
      })
    }
    static accept({ id,qr }) {
      return this.update(
        {
          status: true,
          qrimage: qr,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }
    static scanned({id}){
      return this.update(
        {
          scannedstatus: true,
        },{
          where:{
            id: id
          },
        }
      );
    }
  }
  OutpassRequest.init({
    PlaceToBeVisited: DataTypes.STRING,
    PurposeOfVisit: DataTypes.STRING,
    datetimeout: DataTypes.DATE,
    datetimein: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    qrimage: DataTypes.BLOB,
    userid: DataTypes.INTEGER,
    scannedstatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'OutpassRequest',
  });
  return OutpassRequest;
};