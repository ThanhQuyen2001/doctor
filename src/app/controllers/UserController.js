const { toClient } = require('../../core/helpers');
const User = require('../models/User');
class UserController {
    async findOne(req, res, next) {
        try {
            let entry = await User.findOne({ _id: req.params.id });
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
            const { limit = 12, page = 1 } = req.query;
            let users = await User.find({})
                .skip(+limit * +(page - 1))
                .limit(+limit)
                .sort({ createdAt: -1 });
            users = users.map((user) => {
                user = toClient(user);
                delete user.refresh_token;
                delete user.password;
                return user;
            });
            const totalDocs = await User.countDocuments();
            res.status(200).json({
                code: 1,
                data: users,
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
            let user = await User.findOne({
                $or: [
                    { phone: req.body.phone },
                    { username: req.body.username },
                ],
            });
            if (user) {
                return res.status(409).json({
                    code: 0,
                    message: 'Số điện thoại hoặc tên đăng nhập đã tồn tại',
                });
            }
            let entry = await User.create({
                password: '123456a@',
                ...req.body,
            });
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
            let user = await User.findOne({ _id: req.params.id });
            let userMatch = await User.findOne({
                $and: [
                    {
                        $or: [
                            { phone: req.body.phone },
                            { username: req.body.username },
                        ],
                    },
                    { _id: { $ne: req.params.id } },
                ],
            });
            if (userMatch) {
                return res.status(409).json({
                    code: 409,
                    message: 'Số điện thoại hoặc tên đăng nhập đã tồn tại',
                });
            }
            await User.update(
                { _id: req.body.id },
                { password: user.password, ...req.body },
            );
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
            await User.deleteOne({ _id: req.params.id });
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
