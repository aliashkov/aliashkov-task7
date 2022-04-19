const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://localhost:27017/users',{useNewUrlParser: true});

module.exports = connect;
