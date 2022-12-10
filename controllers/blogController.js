const router = require("express").Router();
const {Op}= require("sequelize")
const { Blog, User } = require("../models");
const { tokenExtractor,sessionValidator } = require("../utils/middleware");

router.get("/", async (req, res) => {
let where={};
if (req.query.search){
  where={
    [Op.or]:[
    {title:{[Op.substring]:req.query.search}},
    {author:{[Op.substring]:req.query.search}}
  ]}
}

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    order:[
      ["likes","DESC"]
    ],
    where
  });
  res.status(200).json(JSON.stringify(blogs, null, 2));
});

router.post("/", tokenExtractor,sessionValidator, async (req, res) => {

  const user = await User.findByPk(req.decodedToken.id);

  if (!user) res.status(404).json({ message: "Couldn't find user" });
  if (!user.status) res.status(401).json({ message: "Couldn't authorize user" });
  
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.status(200).json(blog.toJSON());
});

router.put("/:id", tokenExtractor,sessionValidator,async (req, res) => {
  
  const user = await User.findByPk(req.decodedToken.id);

  if (!user) res.status(404).json({ message: "Couldn't find user" });
  if (!user.status) res.status(401).json({ message: "Couldn't authorize user" });
  

  const blog = await Blog.findByPk(req.params.id);
  blog.likes = blog.likes + 1;
  await blog.save();
  res.status(200).json(blog.likes);
});
router.delete("/:id", tokenExtractor,sessionValidator, async (req, res) => {
  
  const user = await User.findByPk(req.decodedToken.id);
  
  if (!user) res.status(404).json({ message: "Couldn't find user" });
  if (!user.status) res.status(401).json({ message: "Couldn't authorize user" });

  await Blog.destroy({ where: { id: req.params.id } });

  res.status(204).json({ message: "Content deleted" });
});

module.exports = router;
