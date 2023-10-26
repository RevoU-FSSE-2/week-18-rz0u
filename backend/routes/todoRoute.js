const { Router } = require("express");
const todoRouter = Router();
const { authorization } = require("../auth/authorization");
const {
  getTodos,
  createTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

todoRouter.get("/todos", getTodos);
todoRouter.post("/todos", authorization, createTodos);
todoRouter.put("/todos/:id", updateTodo);
todoRouter.delete("/todos/:id", authorization, deleteTodo);

module.exports = todoRouter;
