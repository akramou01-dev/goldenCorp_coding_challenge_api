const Todo = require("../models/Todo");
const error_handler = (err, next) => {
  if (!err.status_code) {
    err.status_code = 500;
  }
  next(err);
};
exports.create_todo = async (req, res, next) => {
  const description = req.body.description;
  try {
    if (!description) {
      const error = new Error("description can not be empty.");
      error.status_code = 402;
      throw error;
    }
    const new_todo = new Todo({
      description: description,
    });
    const saved = await new_todo.save();
    res.status(201).json({
      message: "Todo created successfuly.",
      todo: saved,
    });
  } catch (err) {
    error_handler(err, next);
  }
};

exports.get_todos = (req, res, next) => {
  let page = req.params.page;
  if (!page) {
    page = 1;
  }
  let total_todos;
  Todo.count()
    .then((nbr_todos) => {
      total_todos = nbr_todos;
      return Todo.findAll({
        order: ["id"],
        offset: (page - 1) * 2,
        limit: 2,
      });
    })
    .then((todos) => {
      if (!todos) {
        const error = new Error("Error while fetching.");
        error.status_code = 404;
        throw error;
      }
      console.log(total_todos);
      res.status(200).json({
        todos: todos,
        total_todos: total_todos,
      });
    })
    .catch((err) => {
      error_handler(err, next);
    });
};

exports.get_todo = (req, res, next) => {
  const todo_id = req.params.todo_id;
  Todo.findByPk(todo_id)
    .then((todo) => {
      if (!todo) {
        const error = new Error("Not found.");
        error.status_code = 404;
        throw error;
      }
      res.status(200).json({
        todo: todo,
      });
    })
    .catch((err) => {
      error_handler(err, next);
    });
};

exports.update = (req, res, next) => {
  const todo_id = req.params.todo_id;
  const description = req.body.description;
  const done = req.body.done;

  console.log(done);
  Todo.findByPk(todo_id)
    .then((todo) => {
      if (!todo) {
        const error = new Error("Not found.");
        error.status_code = 404;
        throw error;
      }
      if (description) {
        todo.description = description;
      }
      if (done !== undefined && done !== null) {
        todo.done = done;
      }
      return todo.save();
    })
    .then((todo) => {
      res.status(200).json({
        message: "updated successfuly",
        todo: todo,
      });
    })
    .catch((err) => {
      error_handler(err, next);
    });
};

exports.delete = (req, res, next) => {
  const todo_id = req.params.todo_id;
  Todo.findByPk(todo_id)
    .then((todo) => {
      if (!todo) {
        const error = new Error("not found.");
        error.status_code = 404;
        throw error;
      }
      return todo.destroy();
    })
    .then((todo) => {
      res.status(202).json({
        message: "deleted.",
      });
    });
};

exports.search = (req, res, next) => {
  const title = req.params.title;
  Todo.findAll({ attributes: { include: "description" } })
    .then((todos) => {
      console.log(todos);
      res.status(200).json({
        todos: todos,
      });
    })
    .catch((err) => error_handler(err, next));
};
