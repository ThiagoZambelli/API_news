//rotas para acessar a API
const route = require('express').Router();
const userController = require('../controllers/user.controller')
const { validId, validUser} = require("../middlewares/global.middlewares");

route.post("/", userController.create);
route.get("/", userController.findAll);
route.get("/:id", validId, validUser, userController.findById);
route.patch("/:id", validId, validUser, userController.updateById);

module.exports = route;