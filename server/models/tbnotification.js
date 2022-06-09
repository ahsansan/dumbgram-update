"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tbNotification.belongsTo(models.tbUser, {
        as: "sender",
        foreignKey: {
          name: "idSender",
        },
      });
    }
  }
  tbNotification.init(
    {
      idReceiver: DataTypes.INTEGER,
      idSender: DataTypes.INTEGER,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tbNotification",
    }
  );
  return tbNotification;
};
