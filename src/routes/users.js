const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.post('/create', userController.create);
router.post('/update', userController.update);
router.post('/delete', userController.delete);
router.get('', userController.findAll);

module.exports = router;
