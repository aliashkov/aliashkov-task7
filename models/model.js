const Sequelize = require("sequelize");
const sequelize = require("../connection/connection");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: { 
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;

