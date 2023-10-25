const xss = require("xss");

module.exports = (app) => {
  // XSS protection middleware
  const xssProtection = (req, res, next) => {
    // Clean all request parameters to prevent XSS attacks
    const cleanRequest = (request) => {
      for (const key in request) {
        if (typeof request[key] === "string") {
          request[key] = xss(request[key]);
        } else if (typeof request[key] === "object") {
          request[key] = cleanRequest(request[key]);
        }
      }
      return request;
    };

    // XSS cleaning to request parameters
    req.body = cleanRequest(req.body);
    req.query = cleanRequest(req.query);
    req.params = cleanRequest(req.params);

    next();
  };

  app.use(xssProtection);
};
