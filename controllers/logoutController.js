const router = require("express").Router();
const { Op } = require("sequelize");
const { Session,User } = require("../models");
const { tokenExtractor } = require("../utils/middleware");

router.delete("/", tokenExtractor, async (req, res) => {
  let where = {};
  if (req.query.session === "current") {
    where = {
      [Op.and]: [{ user_id: req.decodedToken.id }, { token: req.token }],
    };
  } else {
    where = { userId: req.decodedToken.id };
  }

  await Session.destroy({
    where,
  });
  const user = await User.findByPk(req.decodedToken.id);
  user.status = false;
  await user.save();
  res.json({ message: "Sucessfully logged out" });
});

module.exports = router;
