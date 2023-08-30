const ServiceAuth = require('../services/auth.service');
 
const crearUsuario = async(req, res) => {
    const resp = await ServiceAuth.crearUsuario(req.body);
    res.status(resp.status).send(resp.response);    
}

const loginUsuario = async(req, res) => {
    const resp = await ServiceAuth.loginUsuario(req.body);
    res.status(resp.status).send(resp.response);    
}


const validJWT = async (req, res) => {
    const resp = await ServiceAuth.validJWT(req);
    res.status(resp.status).send(resp.response);  
}


module.exports = {
    crearUsuario,
    loginUsuario,
    validJWT
}