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
        return res.status(StatusCodes.OK).json({status : 'Taken', order})
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({error})
    }
}

exports.orderList = async (req, res) => {
    const {origin, destination} = req.query
    const queryObject = {}

    if (origin) {
        queryObject.origin = origin
    }

    if (destination) {
        queryObject.destination = origin
    }

    let result = Order.find(queryObject)
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit;
    result = result.skip(skip).limit(limit)

    try {
        const queries = await result
        const orders = await Order.find(queries)
        return res.status(StatusCodes.OK).json({orders, count : orders.lenght})
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json(error) 
    }
}
