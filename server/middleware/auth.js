const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // Leer el token del Header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({msg: 'There is not Token. Invalid permission'})
    }

    // Validar el token
    try {
        // Se verifica el token
        const encryption = jwt.verify(token, process.env.SECRET);
        req.user = encryption.user; // Se agrega al usuario como parte del Request
        next();
    }
    catch (error) {
        res.status(401).json({msg: 'Invalid Token'}); // En caso de enviar un token expirado o intentar adivinarlo
    }
}