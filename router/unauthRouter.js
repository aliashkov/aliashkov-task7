const express = require("express");
const userController = require("../controller/controller");

const unauthRouter = express.Router();

unauthRouter
    .get('/', userController.getAll)
    .get('/:id', userController.getById)
    .post('/login', userController.login)
    .post('/',  userController.add)

module.exports = unauthRouter;
