const jwt = require('jsonwebtoken');
const config = require("../config");
const User = require('../models/model');
const service = require('../services/services');


const auth = async (req, res, next) => {
    try {
        const [strategy, token] = req.headers['authorization'].split(' ');
        console.log(strategy);
        console.log(token);
        const result = jwt.verify(token, config.secret);
        const users = await service.getUsers();
        const foundValue = service.findUser(users,  result.login);
        if (foundValue != null) {
            req.login = result.login;
            next();
        } else {
            return res.status(400).json({ message: 'This user doesnt exists' });
        }
    } catch (e) {
        res.status(401).send(e.message);
    }

}

module.exports = auth;

