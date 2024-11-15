const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

// Conectar a MongoDB
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL)
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error.message);
  });



// Rutas
const authRoutes = require('./routes/authRoutes.js');
const driverRoutes = require('./routes/userRoutes');
// const passengerRoutes = require('./routes/passenger');
app.use('/api/auth', authRoutes); // Ruta para autenticación
app.use('/api/driver', driverRoutes); // Ruta para los conductores
// app.use('/api/passenger', passengerRoutes); // Ruta para los pasajeros




app.use((req, res) => {
  res.status(404).json("Ruta no encontrada");
});

app.get('/', (req, res) => {
    res.send('API corriendo');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
