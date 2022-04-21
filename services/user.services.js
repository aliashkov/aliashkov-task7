const User = require('../models/model');

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
        return User.findOneAndUpdate({ _id: id }, { $set: { "name": name, "password": password, "photo": photo } }, { returnOriginal: false })
    }

    deleteUser(id) {
        return User.deleteOne({ _id: id })
    }

    findUser(users, userName) {
        return users.find(user => user.name == userName);
    }
}

module.exports = new UserService();

