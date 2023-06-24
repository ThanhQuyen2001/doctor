const User = require('../models/User');
class UserController {
    findOne(req, res, next) {
        User.findOne({ _id: req.query.id })
            .then((user) =>
                res.json({
                    code: 0,
                    data: user,
                    message: 'Thành công',
                }),
            )
            .catch(() => {
                res.json({
                    code: 0,
                    data: null,
                    message: 'Thành công',
                });
            });
    }

    async findAll(req, res, next) {
        try {
            let users = await User.find({});
            users.forEach((user) => {
                user.password = '';
            });
            res.status(200).json({
                code: 1,
                data: users,
                message: 'Thành công',
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: 'Lỗi server',
            });
        }
    }

    create(req, res, next) {
        User.create({ ...req.body, password: '' })
            .then(() => {
                res.json({
                    code: 0,
                    message: 'Thành công',
                });
            })
            .catch(() => {
                res.json({
                    code: 1,
                    message: 'Thất bại',
                });
            });
    }

    update(req, res, next) {
        User.updateOne({ _id: req.body._id }, req.body)
            .then(() => {
                res.json({
                    code: 0,
                    message: 'Thành công',
                });
            })
            .catch(() => {
                res.json({
                    code: 1,
                    message: 'Thất bại',
                });
            });
    }

    delete(req, res, next) {
        User.deleteOne({ _id: req.body.id })
            .then(() => {
                res.json({
                    code: 0,
                    message: 'Thành công',
                });
            })
            .catch(() => {
                res.json({
                    code: 1,
                    message: 'Thất bại',
                });
            });
    }
    login(req, res, next) {
        User.findOne({
            phone: req.body.phone,
            password: req.body.password,
        }).then((user) => {
            if (!user) {
                res.json({
                    code: 1,
                    message: 'Tài khoản hoặc mật khẩu không đúng.',
                });
                return;
            }
            if (user) {
                if (user.chucVu == 99) {
                    res.json({
                        code: 2,
                        message: 'Không có quyền đăng nhập.',
                    });
                    return;
                }
            }
            res.json({
                code: 0,
                token: {
                    id: user._id,
                    ten: user.ten,
                    anh: user.anh,
                    chucVu: user.chucVu,
                },
                message: 'Thành công',
            });
        });
    }
}

module.exports = new UserController();
