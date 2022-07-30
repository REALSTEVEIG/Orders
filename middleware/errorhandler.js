const { StatusCodes } = require("http-status-codes")

const errorHandlerMiddleware = async (req, res) => {
    const customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message || `Internal server error, please try again later!`
    }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item)=> item.message).join(',')
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    if (err.code && err.code === 11000) {
        customError.msg = `${Object.keys(err.keyValue)} already exist. Please provide another ${Object.keys(err.keyValue)}`
        customError.code = StatusCodes.BAD_REQUEST
    }

    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = errorHandlerMiddleware