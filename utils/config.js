require('dotenv').config()

module.exports = {
  DATABASE: process.env.DATABASE,
  USER:process.env.USER,
  PASSWORD:process.env.PASSWORD,
  PORT: process.env.PORT || 3001,
  SECRET : process.env.SECRET
}