const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
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
    enum: ["high", "medium", "low"],
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "not completed", "ongoing"],
    default: "not completed",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dueDates: {
    type: Date,
  },
  assignor: {
    type: String,
  },
  assignee: {
    type: String,
    required: true,
  },
});

const Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;
