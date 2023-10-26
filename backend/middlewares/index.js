const applyHelmet = require("./helmet");
const applyXss = require("./xssprotection");

module.exports = (app) => {
  applyHelmet(app);
  applyXss(app);
};
