const Medicine = require('../models/Medicine');
const MedicineType = require('../models/MedicineType');
const { toClient, mutipleToClient } = require('../../core/helpers');

class MedicineController {
    async findOne(req, res, next) {
        try {
            let entry = await Medicine.findOne({ _id: req.params.id });
            let type = await MedicineType.findOne({ _id: entry.type_id });
            entry = toClient(entry);
            entry.type = type;
            res.status(200).json({
                code: 1,
                data: entry,
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }

    async findAll(req, res, next) {
        try {
            const { limit = 12, page = 1 } = req.query;
            let entries = await Medicine.find({})
                .skip(+limit * +(page - 1))
                .limit(+limit)
                .sort({ createdAt: -1 });
            entries = mutipleToClient(entries);
            for (let index = 0; index < entries.length; index++) {
                const item = entries[index];
                let type = await MedicineType.findOne({ _id: item.type_id });
                item.type = type;
            }
            const totalDocs = await Medicine.countDocuments();
            res.status(200).json({
                code: 1,
                data: entries,
                pagination: {
                    limit: limit,
                    page: page,
                    total: totalDocs,
                },
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }

    async create(req, res, next) {
        try {
            let entry = await Medicine.create(req.body);
            res.status(200).json({
                code: 1,
                data: entry,
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }

    async update(req, res, next) {
        try {
            await Medicine.updateOne({ _id: req.params.id }, req.body);
            res.status(200).json({
                code: 1,
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }

    async delete(req, res, next) {
        try {
            await Medicine.deleteOne({ _id: req.params.id });
            res.status(200).json({
                code: 1,
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }
}

module.exports = new MedicineController();
