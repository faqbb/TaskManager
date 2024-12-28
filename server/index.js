
import express from 'express'
import { configDotenv } from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose';
import taskRouter from './routes/taskRouter.js';

// Inicia dotenv
configDotenv()

// Variables de entorno
const PORT  = process.env.PORT || 3030
const MONGO_URI = process.env.MONGO_URI 

// App
const server = express()

// Middlewares
server.use(express.json())
server.use(cors())

// Conexion a base de datos
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a base de datos'))
  .catch((err) => console.error('Error al conectar a base de datos:', err));

// Pongo a escuchar al servidor
server.listen(PORT, () => {
    console.log('Listening on ' + PORT) 
})

// Uso el enrutador
server.use('/api/tasks', taskRouter)



