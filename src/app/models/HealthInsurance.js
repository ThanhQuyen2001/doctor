const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HealthInsurance = new Schema(
    {
        full_name: { type: String, default: '' },
        id_card: { type: String, default: '' },
        dob: { type: Date, default: '' },
        expired_at: { type: Date, default: '' },
        is_expired: { type: Boolean, default: false },
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

module.exports = mongoose.model('HealthInsurance', HealthInsurance);
