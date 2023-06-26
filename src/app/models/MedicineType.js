const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MedicineType = new Schema(
    {
        name: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    },
);

module.exports = mongoose.model('MedicineType', MedicineType);
