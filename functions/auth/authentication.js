const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../config/jwt.js");

exports.authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Access Denied, please login" });
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, JWT_SIGN);
      console.log(decodedToken, "---------decodedToken");
      req.id = decodedToken.id;
      req.role = decodedToken.role;
      req.username = decodedToken.username;
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
