const mongoose = require("mongoose");

exports.User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["manager", "employee"],
    default: "employee",
    required: true,
  },
});
