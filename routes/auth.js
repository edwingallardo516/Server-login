const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { login, googleSingIn } = require('../controllers/auth');
const { inputValidation } = require('../middlewares/inputValidation');

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    inputValidation
],login)

router.post('/google',[
    check('id_token','Verificacion de Google erronea').not().isEmpty(),
    inputValidation
],googleSingIn)

module.exports = router;