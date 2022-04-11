class userService {
    User = require("../models/model");
    users = this.User.findAll({attributes: ['id', 'name']}).then(data => this.users = data).catch(err => console.log(err));

    getAll = () => {
        return this.users
    }

    getById = (key) => {
        return this.users.filter(user => key == user.id);
    }

    deleteById = (key) => {
        this.users = this.users.filter(user => key != user.id);
        this.User.destroy({ where: { id: key } }).then((res) => console.log(res));
        return this.users;
    }

    add = (data) => {
        let uid = 0;
        this.users.forEach(elem => {
            uid = Math.max(elem.id);
        })
        ++uid;
        this.users.push({ id: Number(uid), name: data });
        this.User.create({ name: data }).then(res => console.log(res)).catch(err => console.log(err));
        return this.users;
    }

    update = (data, key) => {
        this.User.update({ name: data }, { where: { id: key } }).then(res => console.log(res)).catch(err => console.log(err));
        this.users = this.users.filter(user => {
            if (key == user.id) {
                user.name = data;
            }
            return user;
        })

        return this.users;
    }

}

module.exports = new userService();
