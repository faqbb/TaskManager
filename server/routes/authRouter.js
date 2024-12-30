import express from 'express';
import {  getMyData, loginUser } from '../controllers/authController.js';
import { body } from 'express-validator';

const authRouter = express.Router();

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('El email no es válido'),

  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria'),
];

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso
 *       '400':
 *         description: Credenciales inválidas
 *       '500':
 *         description: Error en el servidor
 */
authRouter.post('/login', validateLogin, loginUser);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener datos del usuario
 *     tags: [Auth]
 *     responses:
 *       '200':
 *         description: Datos del usuario obtenidos con éxito
 *       '401':
 *         description: No se proporcionó el token
 *       '404':
 *         description: Usuario no encontrado
 *       '500':
 *         description: Error en el servidor
 */
authRouter.get('/me', getMyData)

export default authRouter;
