const {Router} = require('express');
const {check} = require('express-validator');
const {validateField} = require('../middlewares/checkFields');
const ControllerAuth = require('../controllers/auth.controller');
const {checkJWT} = require('../middlewares/checkJWT');
const route = require('../constants/routes');
const field = require('../constants/fields');
const message = require('../constants/messages');

const router = Router();

router.post(route.LOGIN, [
        check(field.EMAIL, message.EMAIL_REQUIRED).isEmail(),
        check(field.PASSWORD, message.INVALID_PASSWORD).isLength({ min: 5 }),
        validateField
], ControllerAuth.loginUsuario);

router.post(route.CREAR, [ 
        check(field.NAME, message.NAME_REQUIRED).not().isEmpty(),
        check(field.EMAIL, message.EMAIL_REQUIRED).isEmail(),
        check(field.PASSWORD, message.INVALID_PASSWORD).isLength({ min: 5 }),
        validateField
], ControllerAuth.crearUsuario);

router.get(route.VAL_TOKEN, checkJWT , ControllerAuth.validJWT);

module.exports = router;