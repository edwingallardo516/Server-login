const Role = require('../models/roles')
const User = require('../models/user')
const {ObjectId} = require('mongoose')

const rolValidation = async (rol = '') => {
    const existRol = await Role.findOne({rol : rol})
    if(!existRol){
        throw new Error(`El rol ${rol} no hace parte de la base de datos`)
    }
}

const emailValidation = async (email = '') => {
    const existEmail = await User.findOne({email:email})
    if(existEmail){
        throw new Error(`El email: ${email} ya se encuentra registrado`)
    }
}

const idValidation = async ( id ) => {
    const existId = await User.findById( id )
    if(!existId){
        throw new Error(`El ID: ${id} no existe`)
    }
}


module.exports = {
    rolValidation,
    emailValidation,
    idValidation
}