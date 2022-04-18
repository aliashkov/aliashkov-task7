const express = require("express");
const userController = require("../controller/controller");
const loginValidator = require('../middleware/check');
const multer = require('../middleware/multer')

const unauthRouter = express.Router();


unauthRouter
    .get('/', userController.getAll)
    .get('/:id', userController.getById)
    .post('/login', userController.login)
    .post('/',  multer, loginValidator(),  userController.add)

module.exports = unauthRouter;
