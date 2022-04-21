const express = require("express");
const userController = require("../controller/user.controller");
const authController = require("../controller/authlogin.controller");
const loginValidator = require('../middleware/validator');
const multer = require('../middleware/multer')

const unauthRouter = express.Router();


unauthRouter
    .get('/', userController.getAll)
    .get('/:id', userController.getById)
    .post('/login', authController.login)
    .post('/',  multer, loginValidator(),  authController.add)

module.exports = unauthRouter;
