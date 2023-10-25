const applyHelmet = require("./helmet");
const applyAuth = require("./auth");
const applyXss = require("./xssprotection");

module.exports = (app) => {
  applyHelmet(app);
  applyXss(app);
  applyAuth(app);
};
