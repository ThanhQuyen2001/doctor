const jwt = require('jsonwebtoken');
const User = require('../models/User');
const position = require('../../constants/position');
const auth = require('../../constants/auth');
class UserController {
    async login(req, res, next) {
        let user = await User.findOne({
            username: req.body.username,
            password: req.body.password,
        });
        if (!user || user.position === position.USER) {
            res.json({
                code: 0,
                message: 'Tài khoản hoặc mật khẩu không đúng.',
            });
        } else {
            const token = jwt.sign({ data: user }, auth.SECRET_KEY, {
                expiresIn: '1h',
            });
            res.cookie('token', token).status(200).json({
                code: 1,
                token: token,
                user: user,
                message: 'Thành công',
            });
        }
    }
    async getProfile(req, res, next) {
        try {
            const token = req.headers.cookie.replace('token=', '');
            const verified = jwt.verify(token, auth.SECRET_KEY);
            res.status(200).json({
                code: 1,
                data: verified,
            });
        } catch {
            res.status(500).json({
                code: 500,
                message: 'Lỗi server',
            });
        }
    }
}

module.exports = new UserController();
