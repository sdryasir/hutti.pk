const express = require('express')
const errorMiddleWare = require('./middlewares/errors')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload())


const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)

app.use(errorMiddleWare)
module.exports = app