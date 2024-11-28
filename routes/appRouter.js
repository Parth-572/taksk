const { registerController } = require("../controllers/registerControllers");
const { loginController } = require("../controllers/loginController");
const { Router } = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const { updateController } = require("../controllers/updateController");

const appRouter = Router();

appRouter.post("/register", registerController);
appRouter.post("/login", loginController);
appRouter.put("/update/:id", updateController);

module.exports = appRouter;
