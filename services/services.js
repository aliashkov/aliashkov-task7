class userService {
    User = require("../models/model");
    users = this.User.findAll({ attributes: ['id', 'name'] }).then(data => this.users = data).catch(err => console.log(err));

    getAll = () => {
        return this.users
    }

    getById = (key) => {
        const foundKey = this.users.find(user => key == user.id);
        if (foundKey != null)
            return foundKey
        return "No such key in this table"
    }

    deleteById = (key) => {
        const foundKey = this.users.find(user => key == user.id);
        if (foundKey != null) {
            this.User.destroy({ where: { id: key } }).then((res) => console.log(res));
            return this.users;
        }
        return "No such key in this table"
    }

    add = (data) => {
        const foundValue = this.users.find(user => user.name == data);
        if (foundValue == null) {
            let uid = 0;
            this.users.forEach(elem => {
                uid = Math.max(elem.id);
            })
            ++uid;
            this.users.push({ id: Number(uid), name: data });
            this.User.create({ name: data }).then(res => console.log(res)).catch(err => console.log(err));
            return this.users;
        }
        return "This value already exists in database"

    }

    update = (data, key) => {
        const foundKey = this.users.find(user => key == user.id);
        if (foundKey != null) {
            this.User.update({ name: data }, { where: { id: key } }).then(res => console.log(res)).catch(err => console.log(err));
            this.users = this.users.filter(user => {
                if (key == user.id) {
                    user.name = data;
                }
                return user;
            })
            return this.users;
        }
        return "No such key in this table"

    }

}

module.exports = new userService();
