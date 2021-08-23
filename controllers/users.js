const {response, request} = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

// Obtener los usuarios
const usersGet = async (req = request,res = response) => {
    const { from = 1 , to = 5} = req.query
    const query = {state:true}

    const [ countUsers, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(to))
    ])

    res.json({
        countUsers,
        users
    })
}

// Agregar usuarios
const usersPost = async (req,res) => {
    
    const {name, email, password, rol} = req.body;
    const user = new User({ name, email, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync( password, salt)

    // Guardar en DB
    await user.save();
    res.json({
        user
    })
}

// Actualizar Usuarios
const usersPut = async (req,res = response) => {
    const id = req.params.id
    const {_id, password, google,...body } = req.body

    // Validar todo contra la base de datos
    if( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync()
        body.password = bcryptjs.hashSync( password, salt)
    }

    const user = await User.findByIdAndUpdate( id , body )

    res.json(user)
}

// Eliminar usuarios
const usersDelete = async (req,res = response) => {

    const {id}= req.params
    const uid = req.uid;
    // Borrar Fisicamente
    // const deleteUser = await User.findByIdAndDelete(id)

    const deleteUser = await User.findByIdAndUpdate(id, {state: false})
    const userAuth = req.userAuth

    res.json({
        deleteUser,
        userAuth
    })
}

module.exports = {
    usersGet,
    usersDelete,
    usersPost,
    usersPut  
}