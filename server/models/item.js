'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Review }) {
      // define association here
      Item.hasMany(Review, {
        foreignKey: {
          name: "itemId",
          allowNull: false,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Item.belongsTo(User ,{foreignKey: {
        name: "userId",
        allowNull: false,
      }})
    }
  }
  Item.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT('long'),
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};