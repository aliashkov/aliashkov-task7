const {check} = require('express-validator')

const loginValidator = () => {
    return [
        check('name', "User name cannot null")
           .notEmpty()
           .matches(/^[A-Za-z]+$/),
        check('password', "Password should contain at least 3 symbols")
           .isLength({min : 3})
           .matches(/^[A-Za-z0-9]+$/)
    ]
}

module.exports = loginValidator;

