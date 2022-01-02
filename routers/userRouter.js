const router = require("express").Router();
const User = require("../models/userModel");
const userController = require('../controller/userController');
const auth = require('../middleware/auth');

// register
router.post("/register", userController.register);
// log in
router.post("/login", userController.login);

router.get("/logout", auth, userController.logOut);

module.exports = router;
