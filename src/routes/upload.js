const { protect, restrictTo } = require('../middlewares/auth');
const petsController = require('../controllers/petsController')
const upload = require('../middlewares/upload')
const router = express.Router();

router.post('/', protect, restrictTo('ADMIN'), upload.single('image'), petsController.createPet)