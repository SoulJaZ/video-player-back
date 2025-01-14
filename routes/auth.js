// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken'); // Middleware de autenticación

// Ruta para registro
router.post('/register', register);

// Ruta para login
router.post('/login', login);


// Ruta protegida que requiere autenticación
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'Bienvenido al perfil', user: req.user });
});

module.exports = router;
