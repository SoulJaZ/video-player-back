const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtén el token del encabezado 'Authorization'

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado, no se proporcionó token.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido.' });
        }
        
        req.user = decoded.user; // Agrega la información del usuario al objeto de la solicitud
        next(); // Continúa al siguiente middleware o ruta
    });
};

module.exports = authenticateToken;

