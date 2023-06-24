const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String },
        phone: { type: String },
        address: { type: String },
        username: { type: String },
        position: { type: Number },
        password: { type: String },
        dob: { type: Date },
        sex: { type: Number },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
