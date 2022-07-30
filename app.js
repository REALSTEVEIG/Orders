require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const connectDB = require('./db/connect')
const notfoundMiddleware = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/errorhandler')
const orderRouter = require('./routes/books')

app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.use('/', orderRouter)

app.use(notfoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()