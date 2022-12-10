const Blog = require("./blogs")
const User = require("./users")
const ReadingList = require("./readingList")
const Session = require("./sessions")

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User,{through:ReadingList})
User.belongsToMany(Blog,{through:ReadingList,as:"readings"},)

Session.belongsTo(User)
User.hasMany(Session)

module.exports = {
    Blog,
    User,
    ReadingList,
    Session
}