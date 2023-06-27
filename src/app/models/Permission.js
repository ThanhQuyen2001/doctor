const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Permission = new Schema(
    {
        name: { type: String, default: '' },
        action: { type: String, require: true },
        subject: { type: String, require: true },
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
                delete ret.__v;
            },
        },
    },
);

module.exports = mongoose.model('Permission', Permission);
