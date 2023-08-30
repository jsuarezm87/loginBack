const jwt = require('jsonwebtoken');
const message = require('../constants/messages');

const checkJWT = ( req, res, next ) => {
    const token = req.header('login-token');
    if (!token) return res.status(401).json({ ok: false, msg: message.NOT_FOUND_TOKEN });
    
    try {        
        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT);
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({ ok: false, msg: message.INVALID_TOKEN });
    }
    next();
}

module.exports = {checkJWT}