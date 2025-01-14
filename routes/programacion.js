// routes/programacion.js
const express = require('express');
const router = express.Router();
const programacionController = require('../controllers/programacionController');

// Crear una nueva programación
router.post('/programaciones/crear', programacionController.crearProgramacion);

// Obtener todas las programaciones activas
router.get('/programaciones', programacionController.obtenerProgramaciones);

// Editar una programación
router.put('/:id', programacionController.editarProgramacion);

// Eliminar una programación
router.delete('/:id', programacionController.eliminarProgramacion);

module.exports = router;
