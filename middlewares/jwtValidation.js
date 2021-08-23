const { response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async (req, res = response, next ) => {
    const token = req.header('x-token')

    if(!token) {
        return res.status(401).json({msg: 'No hay token en la petición'})
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETKEY)
        // Leer usuario autenticado que corresponde al uid y guardarlo en el req
        const userAuth = await User.findById( uid )

        // Verificar si el usuario existe
        if(!userAuth) {
            return res.status(401).json({msg: 'Usuario inactivo'})
        }

        // Consultar si el usuario está activo
        if(!userAuth.state){
            return res.status(401).json({msg: 'Usuario inactivo'})
        }

        // Guardar el usuario autenticado en el request
        req.userAuth = userAuth

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: 'token no válido'})
    }
}

module.exports = {
    validateJWT
}