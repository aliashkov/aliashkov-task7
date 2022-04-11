const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require('./router/router');

const app = express();
const port = 3000;

const sequelize = require("./connection/connection");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', usersRouter)


sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})
