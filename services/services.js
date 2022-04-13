const User = require('../models/model')

class UserService {

    getUsers() {
        return User.findAll()
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
}

module.exports = new UserService();
