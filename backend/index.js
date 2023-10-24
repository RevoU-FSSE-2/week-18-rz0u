const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 3005;
const mongoConnect = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(Cors());

// DB Config
mongoose
  .connect(mongoConnect)
  .then(() => {
    app.listen(port, () => console.log(`Running on port: ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
