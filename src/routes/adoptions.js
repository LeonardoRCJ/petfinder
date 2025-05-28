const express = require('express')
const router = express.Router();
const adoptionsController = require('../controllers/adoptionsController');
const { protect, restrictTo } = require('../middlewares/auth');

//USER
router.post('/', protect, adoptionsController.createAdoptionRequest)
router.get('/:id', protect, adoptionsController.getMyAdoptions);

//ADMIN 
router.get('/', protect, restrictTo('ADMIN'), adoptionsController.getAllAdoptions)
router.patch('/:id', protect, restrictTo('ADMIN'), adoptionsController.updateAdoptionsStatus)
router.delete('/:id', protect, restrictTo('ADMIN'), adoptionsController.deleteAdoption)

module.exports = router;