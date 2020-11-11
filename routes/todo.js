const express = require("express");
const router = express.Router();
const todo_controllers = require("../controllers/todo");

router.post("/todo", todo_controllers.create_todo);
router.get("/todo/:page", todo_controllers.get_todos);
router.get("/search/:title", todo_controllers.search);
router.get("/todo/:todo_id", todo_controllers.get_todo);
router.put("/todo/:todo_id", todo_controllers.update);
router.delete("/todo/:todo_id", todo_controllers.delete);

module.exports = router;
