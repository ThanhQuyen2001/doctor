const usersRouter = require('./users');
const authRouter = require('./auth');
const checkLoggedIn = require('../core/auth');
function route(app) {
    app.use('/api/admin/users', checkLoggedIn, usersRouter);
    app.use('/api/auth', authRouter);
}

module.exports = route;
