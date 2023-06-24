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
            user = user.toObject();
            user.password = '';
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
}

module.exports = new UserController();
