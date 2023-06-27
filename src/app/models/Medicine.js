const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Medicine = new Schema(
    {
        name: { type: String, default: '' },
        type_id: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            default: '',
        },
        price: {
            value: { type: Number, require: true, default: 0 },
            unit: { type: String, require: true, default: '' },
        },
        drug_dosage: { type: String, default: '' },
        contraindications: { type: String, default: '' },
        side_effects: { type: String, default: '' },
        careful: { type: String, default: '' },
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

module.exports = mongoose.model('Medicine', Medicine);
