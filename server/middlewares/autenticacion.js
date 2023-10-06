const jwt = require('jsonwebtoken');

// =================================================================
// Middleware para verificar token
// =================================================================
let verificaToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido',
                },
            });
        }
        req.usuario = decoded.usuario;
        next(); 
    })
};

// =================================================================
// Middleware para verificar ADMIN_ROLE
// =================================================================
let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    if(usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador',
            },
        });
    }
    next();
}

module.exports = {
    verificaToken,
    verificaAdminRole
}