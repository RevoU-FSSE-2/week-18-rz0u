const mongoose = require("mongoose");

exports.Todos = mongoose.model("Todos", {
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
  dueDates: {
    type: Date,
  },
  assignor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignee: {
    type: String,
    required: true,
  },
});
