const expres = require("express");
const app = expres();
const sequelize = require("./util/Database");
const Todo = require("./models/Todo");
const body_parser = require("body-parser");
const todo_routes = require("./routes/todo");

app.use(body_parser.json());
app.use(body_parser.urlencoded());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/", todo_routes);

app.use("/", (req, res, next) => {
  res.send("Hey from App.js");
});

app.use((error, req, res, next) => {
  console.error(error);
  const message = error.message || "An error occured";
  const status = error.status_code || 500;
  res.status(status).json({
    message: message,
    status: status,
  });
});

sequelize

  //   .sync({force: true})
  .sync()
  .then((result) => {
    console.log("DB connected");
    app.listen(5000);
  })
  .catch((err) => console.error(err));
