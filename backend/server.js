const app = require('./app')
const connetDatabase = require('./config/database')

const cloudinary = require('cloudinary').v2

const dotenv = require('dotenv')

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`)
    console.log('shutting down the server due to the uncaught Exception')
    process.exit(1)
})

dotenv.config({ path: 'backend/config/config.env' })
connetDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`)
    console.log('shutting down the server due to the unhandled rejection')
    server.close(() => {
        process.exit(1)
    })
})