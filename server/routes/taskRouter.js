import express from 'express';
import Task from '../models/Task.js';
import { body, validationResult } from 'express-validator';

// Crear un enrutador
const taskRouter = express.Router();

// Validaciones
const validateTask = [
    body('title')
        .notEmpty()
        .withMessage('El título es obligatorio')
        .isString()
        .withMessage('El título debe ser un texto'),

    body('description')
        .optional()
        .isString()
        .withMessage('La descripción debe ser un texto')
];

// Definir las rutas para las tareas
taskRouter.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Nueva tarea
taskRouter.post('/', validateTask, async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed || false,
        });

        try {
            const newTask = await task.save();
            res.status(201).json(newTask);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
);


taskRouter.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

// Exportar el enrutador
export default taskRouter;



