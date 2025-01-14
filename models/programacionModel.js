// models/programacionModel.js
const db = require('../db');

// Función para crear una nueva programación
const crearProgramacion = async (programacion) => {
    const query = 'INSERT INTO Programacion (id_contenido, hora_inicio, estado) VALUES (?, ?, ?)';
    const {id_contenido, hora_inicio, estado} = programacion;
    // Validar id_contenido: Si está vacío o no es un número, asignar 0 o un valor predeterminado
    const idContenido = id_contenido && !isNaN(id_contenido);
  try {
    const [result] = await db.query(query,
      [idContenido, horaInicio, 'PENDIENTE']
    );
    return result;
  } catch (err) {
    throw new Error('Error al crear la programación: ' + err.message);
  }
};

// Función para obtener todas las programaciones activas (PENDIENTE)
const obtenerProgramaciones = async () => {
    const query = 'SELECT * FROM Programacion';
    try {
        const [rows] = await db.query(query);
        return rows; // Devuelve los contenidos
    } catch (error) {
        throw error; // Si hay error, lo lanzamos
    }
};

// Función para editar una programación
const editarProgramacion = async (id, horaInicio, estado) => {
  try {
    const [result] = await pool.execute(
      'UPDATE Programacion SET hora_inicio = ?, estado = ? WHERE id_programacion = ?',
      [horaInicio, estado, id]
    );
    return result;
  } catch (err) {
    throw new Error('Error al editar la programación: ' + err.message);
  }
};

// Función para eliminar una programación
const eliminarProgramacion = async (id) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM Programacion WHERE id_programacion = ?',
      [id]
    );
    return result;
  } catch (err) {
    throw new Error('Error al eliminar la programación: ' + err.message);
  }
};

module.exports = {
  crearProgramacion,
  obtenerProgramaciones,
  editarProgramacion,
  eliminarProgramacion,
};
