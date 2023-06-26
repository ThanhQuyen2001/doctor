const express = require('express');
const router = express.Router();

const medicineTypeController = require('../app/controllers/MedicineTypeController');

router.get('', medicineTypeController.findAll);
router.get('/:id', medicineTypeController.findOne);
router.post('', medicineTypeController.create);
router.put('/:id', medicineTypeController.update);
router.delete('/:id', medicineTypeController.delete);

module.exports = router;
