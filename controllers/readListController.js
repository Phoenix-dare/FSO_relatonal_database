const { ReadingList, User } = require("../models");
const { tokenExtractor } = require("../utils/middleware");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const allList = await ReadingList.findAll();
  res.status(200).send(allList);
});

router.post("/", async (req, res) => {
  const readingList = await ReadingList.create(req.body);
  res.status(200).send(readingList);
});

router.put("/:id", tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id);

  const user = await User.findByPk(req.decodedToken.id);

  if (!user) res.status(404).json({ message: "Couldn't find user" });
  if (!readingList)  res.status(404).json({ message: "No reading list available with provided parameters" });

  readingList.isRead = req.body.isRead;

  await readingList.save();
  res.status(200).send(readingList);
});
module.exports = router;
