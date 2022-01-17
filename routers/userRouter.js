const router = require("express").Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');

router.get("/:type", auth, userController.getUsersByTypes)
router.put('/update', auth, userController.updateUserInfo)

module.exports = router;
