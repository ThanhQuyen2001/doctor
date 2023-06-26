const User = require('../models/User');
class UserController {
    async findOne(req, res, next) {
        try {
            let entry = await User.findOne({ _id: req.query.id });
            res.status(200).json({
                code: 0,
                data: entry,
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }
    async findAll(req, res, next) {
        try {
            let users = await User.find({});
            res.status(200).json({
                code: 1,
                data: users,
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }

    async create(req, res, next) {
        try {
            let entry = await User.create({ ...req.body });
            res.status(200).json({
                code: 1,
                message: 'Thành công',
                data: entry,
            });
        } catch (error) {
            next();
        }
    }

    async update(req, res, next) {
        try {
            let entry = await User.updateOne({ _id: req.body._id }, req.body);
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
            await User.deleteOne({ _id: req.query.id });
            res.status(200).json({
                code: 1,
                message: 'Thành công',
            });
        } catch (error) {
            next();
        }
    }
}

module.exports = new UserController();
