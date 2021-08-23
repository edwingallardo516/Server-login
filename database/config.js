const mongoose = require('mongoose')
const url_db = process.env.MONGODB_URL

const dbConnection = async() => {
    try {
        await mongoose.connect(url_db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('Base de datos conectada')

    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos')
    }
}

module.exports = {
    dbConnection
}