const {Router} = require('express'); 
const {check} = require('express-validator'); 
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router(); 


//crear un nuevo usuario
router.post('/new',[
    check('name','El nombre es obligatorio').isLength({min:5}),
    check('email','El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min:6}),
    validarCampos
],crearUsuario); 

//Login usuario
router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min:6}),
    validarCampos
] ,loginUsuario); 


//validar y revalidar token
router.get('/renew',revalidarToken); 




module.exports = router; 