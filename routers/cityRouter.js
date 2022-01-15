const router = require("express").Router();
const cityController = require('../controller/cityController');
const auth = require('../middleware/auth');

router.get('', auth, cityController.getCities)
router.get('/:id', auth, cityController.getCity)
router.post('', auth, cityController.createCity)
router.put('/:id', auth, cityController.updateCity);
router.delete('/:id', auth, cityController.deleteCity);

module.exports = router;
