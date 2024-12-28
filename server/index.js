
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import { swaggerUi, swaggerSpec } from './swagger.js';
import taskRouter from './routes/taskRouter.js';
import authRouter from './routes/authRouter.js';

// Inicia dotenv
configDotenv()

// Variables de entorno
const PORT  = process.env.PORT || 3030
const MONGO_URI = process.env.MONGO_URI 

// App
const server = express()

// Middlewares
server.use(express.json())
server.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Conexion a base de datos
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a base de datos'))
  .catch((err) => console.error('Error al conectar a base de datos:', err));

// Pongo a escuchar al servidor
server.listen(PORT, () => {
    console.log('Listening on ' + PORT) 
})

// Documentacion de la API
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Uso enrutadores
server.use('/api/auth', authRouter);
server.use('/api/tasks', taskRouter)



