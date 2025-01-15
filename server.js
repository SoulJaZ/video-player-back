// server.js (o app.js)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Rutas de autenticación
const contenidoRoutes = require('./routes/contenidos'); // Rutas de contenidos
const programacionRoutes = require('./routes/programacion')


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configura CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/contenidos', contenidoRoutes);
app.use('/api/programacion', programacionRoutes);

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Servidor backend funcionando correctamente');
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
