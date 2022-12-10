const { Blog } = require("../models");
const { Sequelize } = require("sequelize");

const router = require("express").Router();

router.get("/", async (req, res) => {

  const blogInfo = await Blog.findAll({
    group: ["blog.author"],
    attributes: [
      "author",
      [Sequelize.fn("SUM", Sequelize.col("likes")), "likes"],
      [Sequelize.fn("COUNT", Sequelize.col("id")), "articles"],
    ],
    order: [["likes", "DESC"]],
  });
  
  res.status(200).json(blogInfo);
});

module.exports = router;
