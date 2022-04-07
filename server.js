const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require('./router/router')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
