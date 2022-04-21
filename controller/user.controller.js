const serviceUsers = require('../services/user.services');
const serviceAuth = require('../services/authlogin.controller');

const { validationResult } = require('express-validator')


const getAll = async (req, res) => {
    try {
        const users = await serviceUsers.getUsers();
        res.send(users);
    } catch (err) {
        return res.status(400).json({ message: 'Database error' });
    }
}

const getById = async (req, res) => {
    try {
        const result = await serviceUsers.getUserById(req.params.id)
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
        const result = await serviceUsers.deleteUser(req.params.id)
        if (result)
            res.json({ message: `User with id - ${req.params.id} deleted` });
        else
            res.status(400).json({ message: `No user with such key ${req.params.id}` });
    } catch (err) {
        return res.status(400).json({ message: 'Database error' });
    }
}



const update = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: errors });
        const { userName, hash } = serviceAuth.getNameAndEncryptedPassword(req.body.name, req.body.password);
        const users = await serviceUsers.getUsers();
        const foundValue = serviceUsers.findUser(users, userName);
        if (foundValue != null)
            return res.status(400).json({ message: 'This user already exists' });
        const result = await serviceUsers.changeUser(req.params.id, { name: userName, password: hash, photo: req.file.path })
        if (result)
            res.status(200).json({ message: `User ${req.params.id} updated` });
        else
            res.status(400).json({ message: `No user with such key ${req.params.id}` });
    } catch (err) {
        return res.status(400).json({ message: `Database error - ${err}` });
    }

}


module.exports = {
    getAll,
    getById,
    deleteById,
    update
}
