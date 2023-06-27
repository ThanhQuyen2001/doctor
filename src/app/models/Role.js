const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Role = new Schema(
    {
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        position: { type: Number, require: true },
        permission_ids: [
            {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
            },
        ],
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

module.exports = mongoose.model('Role', Role);
