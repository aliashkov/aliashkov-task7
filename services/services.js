const User = require('../models/model');
const bcrypt = require('bcrypt');
const config = require("../config");
const jwt = require('jsonwebtoken');

class UserService {

    getUsers() {
        return User.find()
    }

    getUserById(id) {
        return User.findById(id);
    }

    addUser(newUser) {
        return new User(newUser).save();
    }

    changeUser(id, { name, password, photo }) {
        return User.findOneAndUpdate({ _id: id }, { $set: { "name": name , "password": password , "photo": photo } }, { returnOriginal: false })
    }

    deleteUser(id) {
        return User.deleteOne({ _id: id })
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

