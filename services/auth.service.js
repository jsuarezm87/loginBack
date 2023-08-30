const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { crearJWT } = require('../helpers/jwt');
const message = require('../constants/messages');
// const { checkJWT } = require('../middlewares/checkJWT');
 
const crearUsuario = async(data) => {
    const {email, password} = data;

    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return(respuestaERR(message.STATUS_400, message.FALSE, message.EXISTING_USER));
        }

        usuario = new Usuario(data);        
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        const token = await crearJWT( usuario.id, usuario.name );
        return (respuestaOK(message.STATUS_200, message.TRUE, usuario.id, usuario.name, token));
        
    } catch (error) {
        console.log(error);
        return(respuestaERR(message.STATUS_500, message.FALSE, message.CREATE_USER_ERROR));
    }
}


const loginUsuario = async(data) => {
    const { email, password } = data;

    try {        
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return(respuestaERR(message.STATUS_400, message.FALSE, message.USER_EMAIL_NO_EXIST));
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return(respuestaERR(message.STATUS_400, message.FALSE, message.PASS_INCORRECT));
        }

        const token = await crearJWT(usuario.id, usuario.name);
        return (respuestaOK(message.STATUS_200, message.TRUE, usuario.id, usuario.name, token));

    } catch (error) {
        console.log(error);
        return(respuestaERR(message.STATUS_500, message.FALSE, message.LOGIN_ERROR));
    }

}

const respuestaOK = (status, ok, uid, name, token) => {
    return {
        status,
        response: {
            ok,
            uid,
            name,
            token
        }            
    }
}

const respuestaERR = (status, ok, msg) => {
    return {
        status,
        response: {
            ok,
            msg
        }            
    }
}


const validJWT = async (req) => {
    const { uid, name } = req;
    const token = await crearJWT(uid, name);
    return {
        status: message.STATUS_200,
        response: {
            ok: message.TRUE,
            token
        }            
    }
}


module.exports = {
    crearUsuario,
    loginUsuario,
    validJWT
}