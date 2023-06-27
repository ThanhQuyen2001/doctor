const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserToken = new Schema(
    {
        access_token: { type: String, default: '' },
        expired_at: { type: Date, require: true },
        user_id: { type: String, require: true },
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
                delete ret.refresh_token;
            },
        },
    },
);

module.exports = mongoose.model('UserToken', UserToken);
