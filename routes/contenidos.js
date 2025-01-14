const express = require("express");
const {
  getContenidos,
  updateContenido,
  deleteContenido,
  createContenidos,
} = require("../controllers/contenidoController");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken"); // Protege las rutas

// Ruta para agregar contenido
router.post("/", authenticateToken, createContenidos);

// Ruta para obtener todos los contenidos
router.get("/", authenticateToken, getContenidos);

// Ruta para actualizar un contenido por ID
router.put("/:id", authenticateToken, updateContenido);

// Ruta para eliminar un contenido por ID
router.delete("/:id", authenticateToken, deleteContenido);

module.exports = router;
