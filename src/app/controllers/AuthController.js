const jwt = require('jsonwebtoken');
const User = require('../models/User');
const position = require('../../constants/position');
const token = require('../../constants/token');
const moment = require('moment-timezone');
const { toClient } = require('../../core/helpers');
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
            user = toClient(user);
            delete user.refresh_token;
            const access_token = jwt.sign({ data: user }, token.TOKEN_KEY, {
                expiresIn: token.TOKEN_LIFE + 'h',
            });
            const refresh_token = jwt.sign(
                { data: user },
                token.REFRESH_TOKEN_KEY,
                {
                    expiresIn: token.REFRESH_TOKEN_LIFE + 'h',
                },
            );
            let expire_token = new Date(
                moment.utc().add(token.TOKEN_LIFE, 'hours'),
            );
            let expire_refresh_token = new Date(
                moment.utc().add(token.REFRESH_TOKEN_LIFE, 'hours'),
            );
            user.refresh_token = refresh_token;
            await User.updateOne(
                { _id: user.id },
                {
                    refresh_token: refresh_token,
                    rt_expired_at: expire_refresh_token,
                    at_expired_at: expire_token,
                },
            );
            return res.status(200).json({
                code: 1,
                access_token: access_token,
                refresh_token: refresh_token,
                user: user,
                message: 'Thành công',
            });
        }
    }
    async getProfile(req, res, next) {
        try {
            const token = req.headers.cookie.replace('token=', '');
            const verified = jwt.verify(token, token.TOKEN_KEY);
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

    async getNewToken(req, res, next) {
        try {
            let refresh_token = req.query.refresh_token;
            let user = await User.findOne({ refresh_token: refresh_token });
            let current = new Date(moment.utc());
            let expire_refresh_token_at = user.rt_expired_at;
            let expire_token_at = user.at_expired_at;
            if (expire_refresh_token_at > current) {
                if (current > expire_token_at) {
                    user = toClient(user);
                    delete user.refresh_token;
                    const new_access_token = jwt.sign(
                        { data: user },
                        token.TOKEN_KEY,
                        {
                            expiresIn: token.TOKEN_LIFE + 'h',
                        },
                    );
                    const new_refresh_token = jwt.sign(
                        { data: user },
                        token.REFRESH_TOKEN_KEY,
                        {
                            expiresIn: token.REFRESH_TOKEN_LIFE + 'h',
                        },
                    );
                    let expire_token = new Date(
                        moment.utc().add(token.TOKEN_LIFE, 'hours'),
                    );
                    let expire_refresh_token = new Date(
                        moment.utc().add(token.REFRESH_TOKEN_LIFE, 'hours'),
                    );
                    await User.updateOne(
                        { _id: user.id },
                        {
                            refresh_token: new_refresh_token,
                            rt_expired_at: expire_refresh_token,
                            at_expired_at: expire_token,
                        },
                    );
                    res.status(200).json({
                        access_token: new_access_token,
                        refresh_token: new_refresh_token,
                    });
                } else {
                    res.status(409).json({
                        code: 409,
                        message: 'Token chưa hết hạn',
                    });
                }
            } else {
                res.status(401).json({
                    code: 401,
                    message: 'Vui lòng đăng nhập',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({
                code: 401,
                message: 'Vui lòng đăng nhập',
            });
        }
    }
}

module.exports = new UserController();
