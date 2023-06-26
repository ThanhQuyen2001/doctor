const express = require('express');
const router = express.Router();

const medicineController = require('../app/controllers/MedicineController');

router.get('', medicineController.findAll);
router.get('/:id', medicineController.findOne);
router.post('', medicineController.create);
router.put('/:id', medicineController.update);
router.delete('/:id', medicineController.delete);

module.exports = router;
