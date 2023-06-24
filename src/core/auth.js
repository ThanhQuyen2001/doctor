const jwt = require('jsonwebtoken');
const auth = require('../constants/auth');
function checkLoggedIn(req, res, next) {
    try {
        const token_req = req.headers['authorization'].replace('Bearer ', '');
        const verified_req = jwt.verify(token_req, auth.SECRET_KEY);
        if (!verified_req)
            res.status(401).json({
                code: 401,
                message: 'Hết phiên đăng nhập',
            });
        const token = req.headers.cookie.replace('token=', '');
        const verified = jwt.verify(token, auth.SECRET_KEY);
        if (verified) next();
        else {
            return res.status(401).json({
                code: 401,
                message: 'Vui lòng đăng nhập',
            });
        }
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                code: 401,
                message: 'Vui lòng đăng nhập',
            });
        } else {
            res.status(500).json({
                code: 500,
                message: 'Lỗi server',
            });
        }
    }
}

module.exports = checkLoggedIn;
