const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MedicalAppointment = new Schema(
    {
        full_name: { type: String, default: '', require: true },
        disease_name: { type: String, default: '', require: true },
        clinic_id: {
            type: mongoose.Schema.Types.ObjectId,
            default: '',
            require: true,
        },
        sort: { type: Number, default: null, require: true },
        date: { type: Date, default: null, require: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, require: true },
        expired: { type: Boolean, default: false, require: true },
        confirmed: { type: Boolean, require: true, default: false },
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

module.exports = mongoose.model('MedicalAppointment', MedicalAppointment);
