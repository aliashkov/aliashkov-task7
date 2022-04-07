const express = require("express");
const userController = require("../controller/controller");

const usersRouter = express.Router();

usersRouter
    .get('/', userController.getAll)
    .get('/:id', userController.getById)
    .post('/', userController.add)
    .put('/:id', userController.update)
    .delete('/:id', userController.deleteById)

module.exports = usersRouter;
