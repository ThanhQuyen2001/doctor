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
        age: { type: Number },
        sex: { type: String },
        specialist: { type: String },
        degree: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
    },
);

module.exports = mongoose.model('User', User);
