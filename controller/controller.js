const express = require("express");
const UserService = require("../services/services");

class userController {
    service = UserService;
    getAll = (req, res) => {
        res
            .status(200)
            .send(this.service.getAll());
    }

    getById = (req, res) => {
        res
            .status(200)
            .send(this.service.getById(req.params.id));
    }

    deleteById = (req, res) => {
        res
            .status(200)
            .send(this.service.deleteById(req.params.id));
    }

    add = (req, res) => {
        res
            .status(200)
        req.on('data', data => {
            res.send(this.service.add(String(data).trim()));
        })

    }

    update = (req, res) => {
        res
            .status(200)
        req.on('data', data => {
            res.send(this.service.update(String(data).trim(), req.params.id));
        })

    }


}

module.exports = new userController();
