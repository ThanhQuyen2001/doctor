const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Clinic = new Schema(
    {
        name: { type: String, default: '' },
        phone: { type: String, default: '' },
        address: { type: String, default: '' },
        staff_ids: [
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

module.exports = mongoose.model('Clinic', Clinic);
