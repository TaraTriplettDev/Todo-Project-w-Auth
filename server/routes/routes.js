const Controller = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Setting routes for the controller

module.exports = (app) => {
  app.post("/api/register", Controller.register);
  app.post("/api/login", Controller.login);

  app.get("/authCheck", authMiddleware, Controller.authCheck);
};
