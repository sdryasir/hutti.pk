const app = require('./app')
const connetDatabase = require('./config/database')

const dotenv = require('dotenv')

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`)
    console.log('shutting down the server due to the uncaught Exception')
    process.exit(1)
})

dotenv.config({ path: 'backend/config/config.env' })
connetDatabase()

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