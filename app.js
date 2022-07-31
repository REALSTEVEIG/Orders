require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const connectDB = require('./db/connect')
const notfoundMiddleware = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/errorhandler')
const orderRouter = require('./routes/order')
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(helmet());
app.use(cors());
app.use(xss());


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