const { Router } = require("express");
const userRouter = Router();
const { loginUser, registerUser } = require("../controllers/userController");
const { loginLimiter } = require("../middlewares/ratelimit");
const { validator, validateInput } = require("../auth/validation");

userRouter.post("/login", loginLimiter, loginUser);
userRouter.post("/register", validator, validateInput, registerUser);

module.exports = userRouter;
