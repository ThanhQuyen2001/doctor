const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Medicine = new Schema(
    {
        name: { type: String },
        quantity: { type: Number },
        type_id: { type: String, require: true },
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
