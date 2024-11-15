const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
require('dotenv').config({ path: './config/.env' });  // Cargar .env desde la carpeta config


// Middleware para procesar JSON
app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Puerto de escucha
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
