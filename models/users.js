const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate:{
        isEmail: {
            msg:"username should be valid email"
        }
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }

}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user'
})

module.exports = User