const bcrypt = require('bcrypt');
const config = require("../config");
const jwt = require('jsonwebtoken');

class AuthService {

    getNameAndEncryptedPassword(user, password) {
        const userName = user;
        const hash = bcrypt.hashSync(password, config.key);
        return { userName, hash };
    }

    verifyPasswordAndLogin(foundUser, user, password) {
        const verifyPassword = bcrypt.compareSync(password, foundUser.password);
        if ((user === foundUser.name) && (verifyPassword === true))
            return true;
        return false;
    }

    getToken(userName, passwordValue) {
        return jwt.sign({ login: userName, password: passwordValue }, config.secret);
    }
}

module.exports = new AuthService();

