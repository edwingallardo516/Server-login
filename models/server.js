const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'

        // Database
        this.connectDb();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes()
    }
    
    middlewares() {

        // CORS
        this.app.use(cors())
        // Lectura y parseo del body
        this.app.use(express.json())
        // Directorio publico
        this.app.use(express.static('public'))
        

    }
    
    async connectDb() {
        await dbConnection()
    }

    routes () {
        this.app.use(this.usersPath, require('../routes/user'))
        this.app.use(this.authPath, require('../routes/auth'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening in the port http://localhost:${this.port}`)
        })
    }
    
}

module.exports = Server