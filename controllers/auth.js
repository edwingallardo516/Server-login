const {response, request} = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/googleVerify');

const login = async (req,res = response) => {
    
    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const existUser = await User.findOne({email:email})
        if(!existUser){
            return res.status(400).json({msg: 'usuario o contraseña no son correctos - email'})
        }
        
        // Si el usuario está activo
        if(!existUser.state){
            return res.status(400).json({msg: 'usuario o contraseña no son correctos - estado'})
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, existUser.password)
        if(!validPassword){
            return res.status(400).json({msg: 'usuario o contraseña no son correctos - contraseña'})
        }
        // Generar el JWT
        const token = await generateJWT(existUser.id)

        console.log('Acces') 

        res.json({
            existUser,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Algo salió mal"})
    }

    res.json({
        msg:'login ok',
        email,
        password
    })
}

const googleSingIn = async (req,res= response) => {
    const {id_token} = req.body;

    const googleUser = await googleVerify(id_token)
    const { name , img , email} = googleUser

    let user = await User.findOne({ email })

    if ( !user ) {
        // Crear Usuario
        const data = {
            name,
            email,
            password: ':p',
            img,
            google: true
        }

        user = new User(data);
        await user.save()
    }

    if(!user.state){
        res.status(401).json({msg: 'Usuario inactivo'})
    }

    // Generar JWT
    const token = await generateJWT(user.id)

    try {
        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es válido'
        })
    }
}

module.exports = {
    login,
    googleSingIn
}