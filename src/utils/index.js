const jwt = require('jsonwebtoken');
require('dotenv').config()

function verificarToken(req, res, next) {
    let token = req.headers.authorization;
    if (token) {
        const ehValido = jwt.verify(token.split(' ')[1], process.env.SEGREDO);
        if(ehValido){
            next();
        }else{
            res.status(401).send('Token expirado')
        }
    } else {
        res.status(401).send('Acesso não autorizado')
    }
}

module.exports = {
    verificarToken
}