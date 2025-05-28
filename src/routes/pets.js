const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');
const upload = require('../middlewares/upload');
const { protect, restrictTo } = require('../middlewares/auth');

// Rotas públicas
router.get('/', petsController.getAllPets);
router.get('/:id', petsController.getPetById);

// Rotas protegidas (admin)
router.post('/', protect, restrictTo('ADMIN'), upload.single('image'), petsController.createPet);
router.put('/:id', protect, restrictTo('ADMIN'), petsController.updatePet)
router.patch('/:id', protect, restrictTo('ADMIN'), upload.single('image'), petsController.updatePetImage);
router.delete('/:id', protect, restrictTo('ADMIN'), petsController.deletePet);

module.exports = router;
