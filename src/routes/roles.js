const express = require('express');
const router = express.Router();

const roleController = require('../app/controllers/RoleController');

router.get('', roleController.findAll);
router.get('/:id', roleController.findOne);
router.post('', roleController.create);
router.put('/:id', roleController.update);

module.exports = router;
