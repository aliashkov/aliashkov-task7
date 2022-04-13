const express = require("express");
const userController = require("../controller/controller");

const usersRouter = express.Router();
const auth = require('../middleware/auth');

usersRouter
    .get('/', userController.getAll)
    .get('/:id', userController.getById)
    .post('/login', userController.login)
    .post('/',  userController.add)
    .put('/:id', auth, userController.update)
    .delete('/:id', auth, userController.deleteById)

module.exports = usersRouter;
