const usersRouter = require('./users');
const authRouter = require('./auth');
const medicineTypesRoute = require('./medicineTypes');
const checkLoggedIn = require('../core/auth');
const serverError = (res, req, next) => {
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
}

module.exports = route;
