const {check} = require('express-validator')

const loginValidator = () => {
    return [
        check('name', "User name cannot null").notEmpty(),
        check('password', "Password length less than 3 symbols").isLength({min : 3})
    ]
}

module.exports = loginValidator;
