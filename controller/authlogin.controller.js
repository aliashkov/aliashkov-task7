const serviceUsers = require('../services/user.services');
const serviceAuth = require('../services/authlogin.controller');
const { validationResult } = require('express-validator')


const add = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: errors });
        const { userName, hash } = serviceAuth.getNameAndEncryptedPassword(req.body.name, req.body.password);
        const users = await serviceUsers.getUsers();
        const foundValue = serviceUsers.findUser(users, userName);
        if (foundValue != null)
            return res.status(400).json({ message: 'This user already exists' });
        const result = await serviceUsers.addUser({ name: userName, password: hash, photo: req.file.path });
        res.json(result);
    } catch (err) {
        return res.status(400).json({ message: `Database error - ${err}` });
    }
}

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: errors });
        const [login, password] = [req.body.name, req.body.password];
        const users = await serviceUsers.getUsers();
        const foundValue = serviceUsers.findUser(users, login);
        if (foundValue != null) {
            const verifyPasswordAndLogin = serviceAuth.verifyPasswordAndLogin(foundValue, login, password);
            if (verifyPasswordAndLogin) {
                const token = serviceAuth.getToken(login, foundValue.password);
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

module.exports = {
    login,
    add
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
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: errors });
        const { userName, hash } = service.getNameAndEncryptedPassword(req.body.name, req.body.password);
        const users = await service.getUsers();
        const foundValue = service.findUser(users, userName);
        if (foundValue != null)
            return res.status(400).json({ message: 'This user already exists' });
        const result = await service.addUser({ name: userName, password: hash, photo: req.file.path });
        res.json(result);
    } catch (err) {
        return res.status(400).json({ message: `Database error - ${err}` });
    }
}

const update = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: errors });
        const { userName, hash } = service.getNameAndEncryptedPassword(req.body.name, req.body.password);
        const users = await service.getUsers();
        const foundValue = service.findUser(users, userName);
        if (foundValue != null)
            return res.status(400).json({ message: 'This user already exists' });
        const result = await service.changeUser(req.params.id, { name: userName, password: hash, photo: req.file.path })
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
