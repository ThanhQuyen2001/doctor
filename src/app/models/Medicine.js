const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Medicine = new Schema(
    {
        name: { type: String },
        quantity: {
            value: { type: Number },
            unit: { type: String },
        },
        type_id: { type: String, require: true },
        price: {
            value: { type: Number },
            unit: { type: String },
        },
    },
    {
        timestamps: true,
        versionKey: false,
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    },
);

module.exports = mongoose.model('Medicine', Medicine);
