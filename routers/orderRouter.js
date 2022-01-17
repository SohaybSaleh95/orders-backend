const router = require("express").Router();
const orderController = require('../controller/orderController');
const Order = require('../models/orderModel')
const auth = require('../middleware/auth');

router.get('', auth, orderController.getOrders)
router.post('', auth, orderController.createOrder)
router.put('/:id', auth, orderController.updateOrder)
router.put('/:id/status', auth, orderController.updateStatus)
router.put('/:id/rating', auth, orderController.updateRating)
router.delete('/:id', auth, orderController.deleteOrder)

module.exports = router;
