const express = require('express');
const router = express.Router();

const healthInsuranceController = require('../app/controllers/HealthInsuranceController');

router.get('', healthInsuranceController.findAll);
router.get('/:id', healthInsuranceController.findOne);
router.post('', healthInsuranceController.create);
router.put('/:id', healthInsuranceController.update);
router.delete('/:id', healthInsuranceController.delete);

module.exports = router;
