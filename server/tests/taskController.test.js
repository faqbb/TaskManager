import request from 'supertest';
import express from 'express';
import { configDotenv } from 'dotenv';
import User from '../models/User.js';
import { loginUser } from '../controllers/authController.js';

configDotenv();

// Crear app Express para pruebas
const app = express();
app.use(express.json());

// Definir rutas simuladas
app.post('/auth/login', loginUser);

// Simulación de base de datos
jest.mock('../models/User.js');

describe('Auth Controller - loginUser Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/login', () => {
    test('Debe devolver un token si las credenciales son válidas', async () => {
      const mockUser = {
        _id: 1,
        username: 'userTest',
        email: 'usertest@email.com',
        password: 'password1',
      };

      User.findOne.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'usertest@email.com', password: 'password1' });
      console.log(response.body)
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    test('Debe devolver error 400 si el usuario no existe', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test@test.com', password: '123456' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Credenciales inválidas');
    });

    test('Debe devolver error 400 si la contraseña es incorrecta', async () => {
      const mockUser = {
        _id: '1',
        username: 'testuser',
        email: 'test@test.com',
        password: '$2a$10$incorrectpassword',
      };

      User.findOne.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test@test.com', password: 'wrongpassword' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Credenciales inválidas');
    });

    test('Debe devolver error 400 si los datos de entrada no son válidos', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'invalid-email', password: '123' });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    test('Debe devolver error 500 si hay un problema en el servidor', async () => {
      User.findOne.mockRejectedValue(new Error('Error en el servidor'));

      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test@test.com', password: '123456' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error en el servidor');
    });
  });
});
