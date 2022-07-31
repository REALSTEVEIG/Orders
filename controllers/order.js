const { StatusCodes } = require("http-status-codes")
const Order = require("../models/order")

exports.placeOrder = async (req, res) => {
    try {
        const newOrder = await Order.create({...req.body})
        return res.status(StatusCodes.CREATED).json({newOrder})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : 'There was an error!'})
    }
}

exports.takeOrder = async (req, res) => {
    const {origin} = req.body

    try {
        const order = await Order.findOne({origin})
        return res.status(StatusCodes.OK).json({status : success, order})
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({error : 'Order has been taken!'})
    }
}

exports.orderList = async (req, res) => {
    try {
        const orders = await Order.find()
        return res.status(StatusCodes.OK).json({orders, cont : orders.lenght})
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({error : `Order not found!`})
    }
}
