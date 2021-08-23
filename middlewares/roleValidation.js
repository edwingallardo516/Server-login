const { response } = require("express")

const adminRole = ( req,res = response, next) => {
    //jwt ya se encuentra validado
    if ( !req.userAuth){
        return res.status(500).json({msg: 'Se requiere verificación de usuario'})
    }

    const {rol,name} = req.userAuth;

    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({msg: 'Usuario no autorizado para realizar los cambios'})
    }
    next()
}

const haveRole = (...roles) => {
    return ( req,res = response, next) => {
        //jwt ya se encuentra validado
        if ( !req.userAuth){
            return res.status(500).json({msg: 'Se requiere verificación de usuario'})
        }

        if(!roles.includes( req.userAuth)){
            return res.status(401).json({msg: 'Usuario no autorizado'})
        }



        next()
    }
}

module.exports = {
    adminRole,
    haveRole
}