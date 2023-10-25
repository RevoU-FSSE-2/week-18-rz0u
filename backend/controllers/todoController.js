const mongoose = require("mongoose");
const Todos = require("../models/todosSchema");

//Get todos
const getTodos = async (req, res) => {
  try {
    const allTodos = await Todos.find();
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Post todos
const createTodos = async (req, res) => {
  const dbTodo = req.body;
  try {
    const newTodo = await Todos.create(dbTodo);
    res.status(201).send(newTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedTodo = await Todos.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedTodo) {
      return res.status(404).send("Todo not found");
    }
    res.status(200).send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todos.findByIdAndDelete(id);
    if (deletedTodo) {
      res.status(200).send("Todo deleted successfully");
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTodos,
  createTodos,
  updateTodo,
  deleteTodo,
};
