const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JWT_SIGN } = require("../config/jwt.js");
const StandardError = require("../config/standard-error.js");
const mongoose = require("mongoose");

// Register New User Controller
const registerService = async (req, email, username, role, password) => {
  const user = await User.findOne({ username });

  if (user) {
    throw new Error("Username taken");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    username,
    password: hashedPassword,
    role,
  });

  return newUser;
};
const registerUser = async (req, res, next) => {
  const { email, username, password, role } = req.body;

  try {
    const newUser = await registerService(req, email, username, role, password);

    res.status(201).json({
      message: "User successfully registered",
      data: newUser,
    });
  } catch (error) {
    const standardError = new StandardError({
      message: error.message || "Failed registering new user",
      status: 500,
    });
    next(standardError);
  }
};

// Login Existing User
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({
      message: "Username doesnt exist",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (isPasswordCorrect) {
    const expireAt = Math.floor(Date.now() / 1000 + 60 * 10); // 10 mins expire time
    const token = jwt.sign(
      { username: user.username, id: user._id, role: user.role },
      JWT_SIGN,
      { expiresIn: expireAt }
    );
    res.status(200).json({
      message: "Logged in successfully",
      data: token,
    });
  } else {
    res.status(400).json({ error: "Incorrect password" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
