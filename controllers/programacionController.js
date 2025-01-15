  // controllers/programacionController.js
  const programacionModel = require('../models/programacionModel');


  exports.crearProgramacion = async(req, res) => {
    console.log("Cuerpo recibido:", req.body);

    try {
      const {contenidoId, horario, repeticion} = req.body;

      // Convertir el formato si es necesario
      const horarioFormateado = new Date(horario).toISOString();

      if (!contenidoId || !horarioFormateado) {
        return res.status(400).json({ message: "Faltan datos requeridos" });
    }
    //Guardar en la base de datos.
    const nuevaProgramacion = await programacionModel.crearProgramacion({
      contenidoId,
      horarioFormateado,
      repeticion,
      
    });
    console.log("Request Body:", req.body);
    console.log("Contenido ID:", contenidoId);
    console.log("Horario:", horarioFormateado);
    console.log("Repetición:", repeticion);


      res.status(201).json({message: "Programación creada con éxito", data: nuevaProgramacion});
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Error al crear programacion", error: error.message});
    }
  

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