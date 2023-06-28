const express = require('express');
const router = express.Router();

const clinicController = require('../app/controllers/ClinicController');

router.get('', clinicController.findAll);
router.get('/:id', clinicController.findOne);
router.post('', clinicController.create);
router.put('/:id', clinicController.update);
router.delete('/:id', clinicController.delete);

module.exports = router;
