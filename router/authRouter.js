const express = require("express");
const userController = require("../controller/controller");

const authRouter = express.Router();
const auth = require('../middleware/auth');

authRouter
    .put('/:id', auth, userController.update)
    .delete('/:id', auth, userController.deleteById)

module.exports = authRouter;
