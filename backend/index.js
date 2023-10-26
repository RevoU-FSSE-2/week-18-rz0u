const express = require("express");
const Cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const setupDbAndServer = require("./db");
const applySecurity = require("./middlewares");
const todoRouter = require("./routes/todoRoute");
const userRouter = require("./routes/userRoute");
const { authentication } = require("./auth/authentication");

// App Config
const app = express();
const port = process.env.PORT || 3005;
const mongoConnect = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(Cors());
setupDbAndServer(mongoConnect);
applySecurity(app);

//Routers
app.use("/api/users", userRouter);
app.use("/api", authentication, todoRouter);

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
