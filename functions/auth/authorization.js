const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../config/jwt.js");

exports.authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Access Denied" });
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, JWT_SIGN);
      if (decodedToken.role === "manager") {
        next();
      } else {
        res.status(401).json({ error: "Access Denied" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
