const express = require('express')
const router = express.Router();
const usersController = require('../controllers/usersController');
const { protect, restrictTo } = require('../middlewares/auth');


router.get('/', protect, restrictTo('ADMIN'), usersController.getAllUsers)
router.get('/:id', protect, usersController.getUserById)
router.delete('/:id', protect, restrictTo('ADMIN'), usersController.deleteUser)


module.exports = router