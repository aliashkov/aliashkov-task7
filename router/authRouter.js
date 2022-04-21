const express = require("express");
const userController = require("../controller/user.controller");
const loginValidator = require('../middleware/validator')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')

const authRouter = express.Router();


authRouter
    .put('/:id', auth, multer, loginValidator(),  userController.update)
    .delete('/:id', auth, userController.deleteById)

module.exports = authRouter;
