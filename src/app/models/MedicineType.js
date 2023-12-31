const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MedicineType = new Schema(
    {
        name: { type: String, default: '' },
        description: { type: String, default: '' },
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

module.exports = mongoose.model('MedicineType', MedicineType);
