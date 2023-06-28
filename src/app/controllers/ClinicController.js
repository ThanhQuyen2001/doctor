const Clinic = require('../models/Clinic');
let validator = (req, res, next, entry) => {
    let validate = {
        name: 'Tên phòng khám',
        phone: 'Số điện thoại',
        address: 'Địa chỉ',
    };
    for (let key in validate) {
        if (!entry[key]) {
            return {
                value: false,
                message: validate[key] + ' không được trống',
            };
        }
    }
    return {
        value: true,
        message: 'Đầy đủ thông tin',
    };
};

class ClinicController {
    async findOne(req, res, next) {
        try {
            let entry = await Clinic.findOne({ _id: req.params.id });
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
            let entries = await Clinic.find({})
                .skip(+limit * +(page - 1))
                .limit(+limit)
                .sort({ createdAt: -1 });
            const totalDocs = await Clinic.countDocuments();
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
            let result_validator = validator(req, res, next, req.body);
            if (!result_validator.value) {
                return res.status(200).json({
                    code: 409,
                    message: result_validator.message,
                });
            }
            let entry = await Clinic.create(req.body);
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
            let result_validator = validator(req, res, next, req.body);
            if (!result_validator.value) {
                return res.status(200).json({
                    code: 409,
                    message: result_validator.message,
                });
            }
            await Clinic.updateOne({ _id: req.params.id }, req.body);
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
            await Clinic.deleteOne({ _id: req.params.id });
            res.status(200).json({
                code: 1,
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }
}

module.exports = new ClinicController();
