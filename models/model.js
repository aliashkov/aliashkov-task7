const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: String,
        password: String,
        photo: String
    },
    { versionKey: false }
);

const User = mongoose.model("users", userSchema);

module.exports = User;

