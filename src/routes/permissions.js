const express = require('express');
const router = express.Router();

const permissionController = require('../app/controllers/PermissionController');

router.get('', permissionController.findAll);
router.get('/:id', permissionController.findOne);
router.post('', permissionController.create);
router.put('/:id', permissionController.update);
router.delete('/:id', permissionController.delete);

module.exports = router;
