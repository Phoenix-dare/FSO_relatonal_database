const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../utils/db");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: { 
      type: DataTypes.STRING,
       allowNull: false 
      },
    title: { 
      type: DataTypes.STRING, 
      allowNull: false
     },
    url: {
       type: DataTypes.TEXT, 
       allowNull: false 
      },
    likes: { 
      type: DataTypes.INTEGER,
       defaultValue: 0 
      },
    year:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isValidDate(value){
        if (value<2000){
          throw new Error("Valid must be between 2000 and the current year ")
        }
        if (value>2022){
          throw new Error("Valid date should be equal to or less than current year")
        }
      } 
    }
    },
  },
  { sequelize, underscored: true, timestamps: true, modelName: "blog" }
);
module.exports = Blog;
