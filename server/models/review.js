'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Item }) {
      // define association here
      Review.belongsTo(User ,{foreignKey: {
        name: "userId",
        allowNull: false,
      }})
      Review.belongsTo(Item ,{foreignKey: {
        name: "itemId",
        allowNull: false,
      }})
    }
  }
  Review.init({
    review_body: DataTypes.TEXT('long'),
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};