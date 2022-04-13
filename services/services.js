const User = require('../models/model')

class UserService {

    getUsers() {
        return User.findAll({ attributes: ['id', 'name' , 'password'] })
    }

    getUserById(id) {
        return User.findOne({ attributes: ['id', 'name' , 'password'] },{ where: { id } })
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
