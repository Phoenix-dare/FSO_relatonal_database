const jwt = require("jsonwebtoken");
const { Session, User } = require("../models");
const { SECRET } = require("./config");
const { Op } = require("sequelize");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error);
  if (error.name === "ConnectionError") {
    return response.status(500).json({
      error: `Unable to Connect to database:${error.message}`,
    });
  } else if (error.name === "SequelizeValidationError") {
    return response.status(500).json({
      error: `Validation failed:${error.errors[0].message}`,
    });
  } else if (error.name === "QueryError") {
    return response.status(500).json({
      error: `Invalid Query:${error.message}`,
    });
  }
  response.status(400).json({
    error: error.message,
  });
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    req.token=authorization.substring(7)
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const sessionValidator = async (req, res, next) => {
  

  const savedSessions = await Session.findAll({
    where: {
      [Op.and]: [{ user_id: req.decodedToken.id }, { token: req.token }],
    },
  });

  if (!savedSessions.length) {
    return res.status(401).json({ error: "No active sessions.Please log in" });
  } else {
    const user = await User.findByPk(req.decodedToken.id);
    user.status = true;
    await user.save();
  }
  next();
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  sessionValidator,
};
