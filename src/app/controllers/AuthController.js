const jwt = require('jsonwebtoken');
const User = require('../models/User');
const position = require('../../constants/position');
const token = require('../../constants/token');
const moment = require('moment-timezone');
const { toClient } = require('../../core/helpers');
const UserTokenController = require('./UserTokenController');
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
            let user_token = await UserTokenController.findOne(user.id);
            let current = new Date(moment.utc());
            let rt_expired_at = user.rt_expired_at;
            if (
                !user_token ||
                current > rt_expired_at ||
                (current < rt_expired_at && current > user_token?.expired_at)
            ) {
                // new token
                delete user.refresh_token;
                let access_token = UserTokenController.getNewToken(
                    user,
                    token.TOKEN_KEY,
                    token.TOKEN_LIFE + 'h',
                );
                let refresh_token = UserTokenController.getNewToken(
                    user,
                    token.REFRESH_TOKEN_KEY,
                    token.REFRESH_TOKEN_LIFE + 'h',
                );
                let at_expired_at = new Date(
                    moment.utc().add(token.TOKEN_LIFE, 'hours'),
                );
                let rt_expired_at = new Date(
                    moment.utc().add(token.REFRESH_TOKEN_LIFE, 'hours'),
                );
                await Promise.all([
                    User.updateOne(
                        { _id: user.id },
                        {
                            refresh_token: refresh_token,
                            rt_expired_at: rt_expired_at,
                        },
                    ),
                    UserTokenController.upsert({
                        user_id: user.id,
                        access_token: access_token,
                        expired_at: at_expired_at,
                    }),
                ]);
                res.status(200).json({
                    code: 200,
                    data: {
                        access_token: access_token,
                        refresh_token: refresh_token,
                        user: user,
                    },
                    message: 'Thành công',
                });
            } else if (current < user_token.expired_at) {
                // old token
                res.status(200).json({
                    code: 200,
                    data: {
                        access_token: user_token.access_token,
                        refresh_token: user.refresh_token,
                        user: user,
                    },
                    message: 'Thành công',
                });
            } else {
                res.status(409).json({
                    code: 409,
                    message: 'Token hết hạn',
                });
            }
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
            res.status(401).json({
                code: 401,
                message: 'Vui lòng đăng nhập',
            });
        }
    }

    async getNewToken(req, res, next) {
        try {
            let refresh_token = req.query.refresh_token;
            let user = await User.findOne({ refresh_token: refresh_token });
            user = toClient(user);
            let current = new Date(moment.utc());
            let rt_expired_at = user.rt_expired_at;
            let user_token = await UserTokenController.findOne(user.id);
            if (
                !user_token ||
                current > rt_expired_at ||
                (current < rt_expired_at && current > user_token?.expired_at)
            ) {
                delete user.refresh_token;
                let access_token = UserTokenController.getNewToken(
                    user,
                    token.TOKEN_KEY,
                    token.TOKEN_LIFE + 'h',
                );
                let refresh_token = UserTokenController.getNewToken(
                    user,
                    token.REFRESH_TOKEN_KEY,
                    token.REFRESH_TOKEN_LIFE + 'h',
                );
                let at_expired_at = new Date(
                    moment.utc().add(token.TOKEN_LIFE, 'hours'),
                );
                let rt_expired_at = new Date(
                    moment.utc().add(token.REFRESH_TOKEN_LIFE, 'hours'),
                );
                await Promise.all([
                    User.updateOne(
                        { _id: user.id },
                        {
                            refresh_token: refresh_token,
                            rt_expired_at: rt_expired_at,
                        },
                    ),
                    UserTokenController.upsert({
                        user_id: user.id,
                        access_token: access_token,
                        expired_at: at_expired_at,
                    }),
                ]);
                res.status(200).json({
                    code: 200,
                    data: {
                        access_token: access_token,
                        refresh_token: refresh_token,
                        user: user,
                    },
                    message: 'Thành công',
                });
            } else if (current < user_token.expired_at) {
                // old token
                res.status(200).json({
                    code: 200,
                    data: {
                        access_token: user_token.access_token,
                        refresh_token: user.refresh_token,
                        user: user,
                    },
                    message: 'Thành công',
                });
            } else {
                res.status(409).json({
                    code: 409,
                    message: 'Token hết hạn',
                });
            }
        } catch (error) {
            res.status(401).json({
                code: 401,
                message: 'Vui lòng đăng nhập',
            });
        }
    }
}

module.exports = new UserController();
