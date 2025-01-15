const db = require('../db');

// Agregar contenido
const agregarContenido = async (contenido) => {
    const query = 'INSERT INTO Contenidos (tipo, titulo, url_contenido, duracion, horario) VALUES (?, ?, ?, ?, ?)';
    const { tipo, titulo, url_contenido, duracion, horario } = contenido;
    // Validar duracion: Si está vacío o no es un número, asignar 0 o un valor predeterminado
    const duracionValida = duracion && !isNaN(duracion) ? parseInt(duracion, 10) : 0;
    try {
        const [result] = await db.query(query, [tipo, titulo, url_contenido, duracionValida, horario]);
        return result; // Devuelve el resultado de la inserción
    } catch (error) {
        throw error; // Si hay error, lo lanzamos para manejarlo en el controlador
    }
};

// Obtener todos los contenidos
const obtenerContenidos = async () => {
    const query = 'SELECT * FROM Contenidos';
    try {
        const [rows] = await db.query(query);
        return rows; // Devuelve los contenidos
    } catch (error) {
        throw error; // Si hay error, lo lanzamos
    }
};

// Actualizar contenido por ID
const actualizarContenido = async (id, contenido) => {
    const query = 'UPDATE Contenidos SET tipo = ?, titulo = ?, url_contenido = ?, duracion = ?, horario = ? WHERE id_contenido = ?';
    const { tipo, titulo, url_contenido, duracion, horario } = contenido;

    try {
        const [result] = await db.query(query, [tipo, titulo, url_contenido, duracion, horario, id]);
        return result; // Devuelve el resultado de la actualización
    } catch (error) {
        throw error; // Si hay error, lo lanzamos
    }
};

// Eliminar contenido por ID
const eliminarContenido = async (id) => {
    const query = 'DELETE FROM Contenidos WHERE id_contenido = ?';
    db.execute(query, [id], (err, result) => {
        if (err) {
          console.error('Error al eliminar el contenido:', err);
          return res.status(500).send({ message: 'Error al eliminar el contenido' });
        }
        if (result.affectedRows > 0) {
          return res.status(200).send({ message: 'Contenido eliminado con éxito' });
        } else {
          return res.status(404).send({ message: 'Contenido no encontrado' });
        }
      });
};

module.exports = {
    agregarContenido,
    obtenerContenidos,
    actualizarContenido,
    eliminarContenido,
};
