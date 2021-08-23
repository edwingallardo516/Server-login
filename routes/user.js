
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users');

const { rolValidation, emailValidation, idValidation } = require('../middlewares/dbValidation');
const { inputValidation } = require('../middlewares/inputValidation');
const { validateJWT } = require('../middlewares/jwtValidation');
const { adminRole, haveRole } = require('../middlewares/roleValidation');

// La configuracion /api/users ya viene del models
router.get('/',usersGet)

router.put('/:id',[
    check('id', 'No es una ID válido').isMongoId(),
    check('id').custom(idValidation),
    check('rol').custom(rolValidation),
    inputValidation
], usersPut)

router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria y debe tener más de 6 caracteres').isLength({min: 6}),
    check('email','Correo inválido').isEmail(),
    check('email').custom(emailValidation),
    check('rol').custom(rolValidation),
    inputValidation
],usersPost)


router.delete('/:id',[
    validateJWT,
    adminRole,
    check('id', 'No es una ID válido').isMongoId(),
    check('id').custom(idValidation),
    inputValidation
],usersDelete)

module.exports = router