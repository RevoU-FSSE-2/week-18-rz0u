const dotenv = require("dotenv");
dotenv.config();

exports.JWT_SIGN = process.env.SECRET;
