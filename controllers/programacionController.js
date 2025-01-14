// controllers/programacionController.js
const programacionModel = require('../models/programacionModel');


exports.crearProgramacion = async(req, res) => {
    const programacion = req.body;
  
    // Validación simple
    if (!hora_inicio || !estado) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }try {
        const result = await programacionModel.crearProgramacion(programacion);
        res.status(201).json(result); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar programación')
    };

  };
  
  exports.obtenerProgramaciones = async (req, res) => {
    try {
        const programaciones = await programacionModel.obtenerProgramaciones(); // Asegúrate de que este método está definido
        res.status(200).json(programaciones);
      } catch (error) {
        console.error("Error al obtener programaciones:", error);
        res.status(500).send("Error al obtener programaciones");
      }
  };
  
  exports.editarProgramacion = (req, res) => {
    const { id } = req.params;
    const { hora_inicio, estado } = req.body;
  
    const programacion = programacionModel.find((p) => p.id === parseInt(id));
  
    if (!programacion) {
      return res.status(404).json({ message: "Programación no encontrada" });
    }
  
    // Actualizar datos
    programacion.hora_inicio = hora_inicio || programacion.hora_inicio;
    programacion.estado = estado || programacion.estado;
  
    res.json(programacion);
  };
  
  exports.eliminarProgramacion = (req, res) => {
    const { id } = req.params;
  
    const index = programacionModel.findIndex((p) => p.id === parseInt(id));
  
    if (index === -1) {
      return res.status(404).json({ message: "Programación no encontrada" });
    }
  
    programacionModel.splice(index, 1);
    res.status(204).send(); // No Content
  };