import { validationResult } from "express-validator";
import Task from "../models/Task.js";


// Busco tareas
export const getTasks = async(req, res) => {
  try {
    const { completed } = req.query;
    const query = completed !== undefined ? { completed: completed === 'true' } : {};
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Busco tarea por ID
export const getTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Nueva tarea
export const createTask = async (req, res) => {
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
};

// Borro una tarea
export const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findByIdAndDelete(taskId);
  
      if (task == null) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
  
      res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
      console.error(error); // Esto ayudará en el debugging
      res.status(500).json({ message: 'Error al intentar eliminar la tarea: ' + error.message });
    }
  };
  
  

// Actualizar una tarea
export const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;

  try {
      const task = await Task.findByIdAndUpdate(taskId, { title, description, completed }, { new: true });

      if (!task) {
          return res.status(404).json({ message: 'Tarea no encontrada' });
      }

      res.json(task);
  } catch (error) {
      console.error('Error en la actualización:', error); 
      res.status(400).json({ message: error.message });
  }
};




