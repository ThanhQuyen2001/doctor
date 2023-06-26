const usersRouter = require('./users');
const authRouter = require('./auth');
const medicineTypesRoute = require('./medicineTypes');
const checkLoggedIn = require('../core/auth');
const serverError = (req, res, next) => {
    res.status(500).json({
        code: 500,
        message: 'Lỗi server',
    });
};
function route(app) {
    app.use('/api/auth', authRouter, serverError);
    app.use('/api/admin/users', checkLoggedIn, usersRouter, serverError);
    app.use(
        '/api/admin/medicine-types',
        checkLoggedIn,
        medicineTypesRoute,
        serverError,
    );
    app.use('*', (req, res, next) => {
        res.status(404).json({
            code: 404,
            message: 'Trang không tồn tại',
        });
    });
}

module.exports = route;
