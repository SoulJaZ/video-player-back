const contenidoModel = require("../models/contenidoModel");

// Agregar contenido
const createContenidos = async (req, res) => {
    const contenido = req.body;

    try {
        const result = await contenidoModel.agregarContenido(contenido);
        res.status(201).json(result); // Devolver el resultado de la inserción
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar contenido');
    }
};
// Obtener todos los contenidos
const getContenidos = async (req, res) => {
  try {
    const contenidos = await contenidoModel.obtenerContenidos();
    res.status(200).json(contenidos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener contenidos");
  }
};

// Actualizar contenido
const updateContenido = (req, res) => {
  const { id } = req.params;
  const contenido = req.body;

  contenidoModel.actualizarContenido(id, contenido, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error al actualizar contenido" });
    res.json({ message: "Contenido actualizado con éxito" });
  });
};

// Eliminar contenido
const deleteContenido = (req, res) => {
  const { id } = req.params;

  contenidoModel.eliminarContenido(id, (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error al eliminar contenido" });
    res.json({ message: "Contenido eliminado con éxito" });
  });
};

module.exports = {
  createContenidos,
  getContenidos,
  updateContenido,
  deleteContenido,
};
