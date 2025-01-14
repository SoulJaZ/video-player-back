// db.js
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verificar la conectividad del pool
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release(); // Liberar la conexión al pool
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1); // Salir si no se puede conectar
  }
})();

module.exports = db;
