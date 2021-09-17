const mongoose = require('mongoose')

const connetDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => console.log(`MongoDB Database has been connected with HOST: ${con.connection.host}`))
}

module.exports = connetDatabase