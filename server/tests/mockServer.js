import express from 'express';
import taskRouter from '../routes/taskRouter.js';
import mongoose from 'mongoose';
import authRouter from '../routes/authRouter.js';

const PORT  = process.env.PORT || 3030
const MONGO_URI = process.env.MONGO_URI 

const app = express();

app.use(express.json());
app.use('/api/tasks', taskRouter);
app.use('/api/auth', authRouter)

mongoose.connect(MONGO_URI)
//   .then(() => console.log('Conectado a base de datos'))
  .catch((err) => console.error('Error al conectar a base de datos:', err));

const mockServer = app.listen(PORT, () => {
//   console.log('Servidor de prueba de  tareas en ejecución en el puerto ' + PORT);
});

// los logs afectan a la ejecucion de jest
export default mockServer; 
