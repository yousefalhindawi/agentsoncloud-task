"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Item, Review }) {
      // define association here
      
      User.hasMany(Review, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      
      User.hasMany(Item, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate({logistics_orders}) {
//       // define association here
//       User.hasMany(logistics_orders , {foreignKey:"user_id"});
//     }
//   }
//   User.init({
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };
