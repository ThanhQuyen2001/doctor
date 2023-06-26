const jwt = require('jsonwebtoken');
const auth = require('../constants/auth');
function checkLoggedIn(req, res, next) {
    try {
        let token_req = req.headers['authorization'] || '';
        token_req = token_req.replace('Bearer ', '');
        const verified_req = jwt.verify(token_req, auth.SECRET_KEY);
        if (!verified_req || !token_req)
            res.status(401).json({
                code: 401,
                message: 'Hết phiên đăng nhập',
            });
        let token = req.headers['cookie'];
        token = token.replace('token=', '');
        const verified = jwt.verify(token, auth.SECRET_KEY);
        if (verified && token) next();
        else {
            return res.status(401).json({
                code: 401,
                message: 'Vui lòng đăng nhập',
            });
        }
    } catch (error) {
        res.status(401).json({
            code: 401,
            message: 'Vui lòng đăng nhập',
        });
    }
}

module.exports = checkLoggedIn;
