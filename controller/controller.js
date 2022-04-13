const service = require('../services/services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../config")

const login = async (req, res) => {
    try {
        const login = req.body.name;
        const password = req.body.password;
        const users = await service.getUsers();
        const foundValue = users.find(user => user.name == login);
        if (foundValue != null) {
            const verifyPassword = bcrypt.compareSync(password, foundValue.password);
            if ((login === foundValue.name) && (verifyPassword === true)) {
                const token = jwt.sign({ login: login, password: foundValue.password }, config.secret);
                return res.send(token);
            }
            return res.status(400).json({ message: 'Incorrect login or password' });
        }
        else
            return res.status(400).json({ message: 'No such user in this db' });
    } catch (err) {
        return res.status(400).json({ message: 'Login error' });
    }

}

const getAll = async (req, res) => {
    try {
        const users = await service.getUsers();
        res.send(users);
    } catch (err) {
        return res.status(400).json({ message: 'Database error' });
    }

}

const getById = async (req, res) => {
    try {
        const result = await service.getUserById(req.params.id)
        if (result)
            res.send(result);
        else
            res.status(400).json({ message: `No user with such key ${req.params.id}` });
    } catch (err) {
        return res.status(400).json({ message: 'Database error' });
    }

}

const deleteById = async (req, res) => {
    try {
        const result = await service.deleteUser(req.params.id)
        console.log(result)
        if (result)
            res.json({ message: `User with id - ${req.params.id} deleted` });
        else
            res.status(400).json({ message: `No user with such key ${req.params.id}` });
    } catch (err) {
        return res.status(400).json({ message: 'Database error' });
    }

}

const add = async (req, res) => {
    try {
        console.log(req.body)
        if (!req.body.name || !req.body.password)
            return res.status(400).json({ message: 'Please add Name and Password values' });
        const hash = bcrypt.hashSync(`${req.body.password}`, config.key);
        const userName = req.body.name;
        const users = await service.getUsers();
        const foundValue = users.find(user => user.name == userName);
        if (foundValue != null)
            return res.status(400).json({ message: 'This user already exists' });
        const result = await service.addUser({ name: userName, password: hash });
        res.json(result);
    } catch (err) {
        return res.status(400).json({ message: `Database error - ${err}` });
    }


}

const update = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(`${req.body.password}`, 1);
        const userName = req.body.name;
        const result = await service.changeUser(req.params.id, { name: userName, password: hash })
        if (result)
            res.status(200).json({ message: `User ${req.params.id} updated` });
        else
            res.status(400).json({ message: `No user with such key ${req.params.id}` });
    } catch (err) {
        return res.status(400).json({ message: `Database error - ${err}` });
    }

}


module.exports = {
    login,
    getAll,
    getById,
    deleteById,
    add,
    update
}
