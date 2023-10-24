const mongoose = require("mongoose");

// Schema
const Todos = mongoose.model("Todos", {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Completed", "Not completed", "Ongoing"],
    default: "Not completed",
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Add 1
const AddTodos = new Todos();

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Completed", "Not completed", "Ongoing"],
    default: "Not completed",
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
