const position = require('../../constants/position');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, default: '' },
        phone: { type: String, default: '' },
        address: { type: String, default: '' },
        username: { type: String, default: '' },
        position: { type: Number, default: position.USER },
        password: { type: String, default: '' },
        dob: { type: Date, default: null },
        age: { type: Number, default: 0 },
        sex: { type: String, default: '' },
        specialist: { type: String, default: '' },
        degree: { type: String, default: '' },
        health_insurance: { type: String, default: '' },
        id_card: { type: String, default: '' },
        enabled: { type: Boolean, default: true },
        count_faild: { type: Number, default: 0 },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
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
