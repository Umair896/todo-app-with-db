const bodyParser = require("body-parser");
const express = require("express");
const todosRouter = require("./src/resources/todos/todos.router");
const sequelize = require("./src/utils/db-connection");
const Todo = require("./src/resources/todos/todos.model");

const app = express();

app.use(bodyParser.json());
app.use("/api/todos", todosRouter);

const PORT = 7000;
const startServer = () => {
  sequelize.sync({ alter: true });
  sequelize
    .authenticate()
    .then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));
  app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
};

startServer();
