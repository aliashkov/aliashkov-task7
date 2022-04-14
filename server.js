const express = require("express");
const bodyParser = require("body-parser");
const unauthRouter = require("./router/unauthRouter");
const authRouter = require("./router/authRouter");
const app = express();
const port = 3000;

const sequelize = require("./connection/connection");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', unauthRouter);
app.use('/users', authRouter);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})
