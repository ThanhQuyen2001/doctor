const jwt = require('jsonwebtoken');
const token = require('../constants/token');
function checkLoggedIn(req, res, next) {
    try {
        let access_token = req.headers['authorization'] || '';
        access_token = access_token.replace('Bearer ', '');
        if (!access_token) {
            return res.status(401).json({
                code: 401,
                message: 'Vui lòng đăng nhập',
            });
        }
        const verified = jwt.verify(access_token, token.TOKEN_KEY);
        if (!verified) {
            return res.status(401).json({
                code: 401,
                message: 'Hết phiên đăng nhập',
            });
        }
        next();
    } catch (error) {
        res.status(401).json({
            code: 401,
            message: 'Vui lòng đăng nhập',
        });
    }
}

module.exports = checkLoggedIn;
