const User = require('../models/model');
const bcrypt = require('bcrypt');
const config = require("../config");
const jwt = require('jsonwebtoken');

class UserService {

    getUsers() {
        return User.findAll({ attributes: ['id', 'name', 'password'] })
    }

    getUserById(id) {
        return User.findOne({ where: { id } })
    }

    addUser(newUser) {
        return User.create(newUser)
    }

    changeUser(id, { name, password }) {
        return User.update({ name, password }, { where: { id } })
    }

    deleteUser(id) {
        return User.destroy({ where: { id } })
    }

    findUser(users, userName) {
        return users.find(user => user.name == userName);
    }

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

module.exports = new UserService();
