const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());
// app.use(cors({
//   origin: 'https://fe-proyectofinal-7nde9vuhz-daniel-martins-projects-c37a0e5e.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

const allowedOrigins = [
  'https://fe-proyectofinal-7nde9vuhz-daniel-martins-projects-c37a0e5e.vercel.app',
  'https://fe-proyectofinal-82w9bro7b-daniel-martins-projects-c37a0e5e.vercel.app',
  'https://be-proyectofinal-git-dev-daniel-martins-projects-c37a0e5e.vercel.app',
  'https://be-proyectofinal-8o5s1y7n7-daniel-martins-projects-c37a0e5e.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cors({
  origin: '*',  // Allow all origins
}));


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
app.use('/api/auth', require('./routes/authRoutes.js')); // Ruta para autenticación
app.use('/api/driver', require('./routes/userRoutes.js')); // Ruta para los conductores
// app.use('/api/passenger', require('./routes/passenger')); // Ruta para los pasajeros



app.get('/', (req, res) => {
    res.send('API corriendo');
});

app.use((req, res) => {
  res.status(404).json("Ruta no encontrada");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
