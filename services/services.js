class userService {

    users = [{ name: "Artyom", id: "1" }, { name: "Alexander", id: "2" }]

    getAll = () => {
        return this.users;
    }

    getById = (key) => {
        return this.users.filter(user => key == user.id);
    }

    deleteById = (key) => {
        this.users = this.users.filter(user => key != user.id);
        return this.users;
    }

    add = (data) => {
        let uid = 0;
        this.users.forEach(elem => {
            uid = Math.max(elem.id);
        })
        this.users.push({ name: data, id: String(++uid) });
        return this.users;
    }

    update = (data, key) => {
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
