const mongoose = require("mongoose");

// DB Config
function setupDbAndServer(mongoConnect) {
  mongoose
    .connect(mongoConnect)
    .then(() => {
      console.log("database connection successful");
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = setupDbAndServer;
