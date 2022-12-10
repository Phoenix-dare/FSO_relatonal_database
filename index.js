/* Not the same as the part demands ,
Have setup database locally rather than fly/heroku */


const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogController");
const usersRouter = require("./controllers/userController");
const loginRouter = require("./controllers/loginController");
const authorRouter = require("./controllers/authorController");
const readingListRouter = require("./controllers/readListController")
const logoutRouter = require("./controllers/logoutController")
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const { errorHandler, unknownEndpoint } = require("./utils/middleware");

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout",logoutRouter)
app.use("/api/authors",authorRouter)
app.use("/api/readinglists",readingListRouter)
app.use(errorHandler);
app.use(unknownEndpoint);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
