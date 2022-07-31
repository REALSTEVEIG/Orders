const express = require('express')
const router = express.Router()

const {placeOrder, takeOrder, orderList} = require('../controllers/order')

router.route('/orders').post(placeOrder).get(orderList)
router.route('/orders/:id').patch(takeOrder)


module.exports = router