const Todos = require("../models/todos");

//Get todos
const getTodos = async (req, res) => {
  try {
    const allTodos = await Todos.find();
    res.status(200).json({ message: "Success get all todos", data: allTodos });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Post todos
const createTodos = async (req, res) => {
  const { title, content, priority, dueDates, assignee } = req.body;
  try {
    const newTodo = await Todos.create({
      title,
      content,
      priority,
      dueDates,
      assignee,
      assignor: req.username,
    });
    res.status(201).json({ message: "Todo created", data: newTodo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedTodo = await Todos.findByIdAndUpdate(
      { _id: id },
      updatedData,
      {
        new: true,
      }
    );
    if (!updatedTodo) {
      return res.status(404).send("Todo not found");
    }
    res.status(200).json({ message: "success updating", data: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todos.findOne({ _id: id, assignor: req.username });
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    if (req.role === "employee" && req.id !== todo.assignor) {
      res.status(403).json({ message: "Permission denied" });
      return;
    }
    const deletedTodo = await Todos.findByIdAndDelete({ _id: id });

    if (deletedTodo) {
      res.status(200).json({ message: "Todo deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to delete the todo" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  createTodos,
  updateTodo,
  deleteTodo,
};
