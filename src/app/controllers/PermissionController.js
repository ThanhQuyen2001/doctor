const Permission = require('../models/Permission');

class PermissionController {
    async findOne(req, res, next) {
        try {
            let entry = await Permission.findOne({ _id: req.params.id });
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
            let entries = await Permission.find({})
                .skip(+limit * +(page - 1))
                .limit(+limit)
                .sort({ createdAt: -1 });
            const totalDocs = await Permission.countDocuments();
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
            let entry = await Permission.create(req.body);
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
            await Permission.updateOne({ _id: req.params.id }, req.body);
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
            await Permission.deleteOne({ _id: req.params.id });
            res.status(200).json({
                code: 1,
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }
}

module.exports = new PermissionController();
