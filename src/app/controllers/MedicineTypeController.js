const MedicineType = require('../models/MedicineType');
class MedicineTypeController {
    async findOne(req, res, next) {
        try {
            let entry = await MedicineType.findOne({ _id: req.query.id });
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
            let entries = await MedicineType.find({});
            res.status(200).json({
                code: 1,
                data: entries,
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }

    async create(req, res, next) {
        try {
            let entry = await MedicineType.create({ ...req.body });
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
            let entry = await MedicineType.updateOne(
                { _id: req.query.id },
                req.body,
            );
            res.status(200).json({
                code: 1,
                message: 'Thành công',
                data: entry,
            });
        } catch (error) {
            next();
        }
    }

    async delete(req, res, next) {
        try {
            await MedicineType.deleteOne({ _id: req.query.id });
            res.statu(200).json({
                code: 1,
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }
}

module.exports = new MedicineTypeController();
