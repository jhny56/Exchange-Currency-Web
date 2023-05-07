const { user } = require("../controllers/user.controllers"); //we took the user object of the file

function setRoutes(app) {
  app.post("/Register", user.register);
  app.post("/Login", user.login);
  app.post("/Currency/Exchange", user.exchange);
}

module.exports = {
  setRoutes,
};
