const express = require('express')
const router = express.Router()

const {placeOrder, takeOrder, orderList} = require('../controllers/order')

router.route('/orders').post(placeOrder)
router.route('/orders/:id').patch(takeOrder)
router.route('/orders').get(orderList)


module.exports = router