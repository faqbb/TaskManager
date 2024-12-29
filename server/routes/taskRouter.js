import express from 'express';
import { body } from 'express-validator';
import { createTask, getTasks, deleteTask, getTaskById, updateTask } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API para gestionar tareas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: El título de la tarea
 *         description:
 *           type: string
 *           description: Descripción de la tarea
 *         completed:
 *           type: boolean
 *           description: Estado de la tarea (completada o no)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la tarea
 */

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

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Obtiene una lista de todas las tareas, con la posibilidad de filtrarlas por su estado de completado.
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: completed
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Filtra las tareas por estado de completado (true o false).
 *     responses:
 *       '200':
 *         description: Lista de tareas obtenidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       '500':
 *         description: Error interno del servidor
 *       '401':
 *         description: No autorizado
 */
taskRouter.get('/', authMiddleware, getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener tarea por ID
 *     description: Obtiene los detalles de una tarea por su ID único.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la tarea.
 *     responses:
 *       '200':
 *         description: Tarea obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Tarea no encontrada
 *       '401':
 *         description: No autorizado
 */
taskRouter.get('/:id', authMiddleware, getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     description: Actualiza una tarea existente con nuevos datos proporcionados.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la tarea a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: Tarea actualizada correctamente
 *       '404':
 *         description: Tarea no encontrada
 *       '401':
 *         description: No autorizado
 */
taskRouter.put('/:id', authMiddleware, updateTask);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una nueva tarea con un título y descripción proporcionados.
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '201':
 *         description: Tarea creada correctamente
 *       '400':
 *         description: Datos de entrada inválidos
 *       '401':
 *         description: No autorizado
 */
taskRouter.post('/', authMiddleware, validateTask, createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Elimina una tarea por su ID único.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la tarea a eliminar.
 *     responses:
 *       '200':
 *         description: Tarea eliminada correctamente
 *       '404':
 *         description: Tarea no encontrada
 *       '500':
 *         description: Error interno del servidor
 *       '401':
 *         description: No autorizado
 */
taskRouter.delete('/:id', authMiddleware, deleteTask);

export default taskRouter;
