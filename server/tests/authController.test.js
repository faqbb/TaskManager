import request from 'supertest';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import mockServer from './mockServer.js';


configDotenv({path: '.env.test'});

jest.mock('../models/User.js');
jest.mock('bcryptjs'); 

afterAll(async () => {
  mockServer.close();  
});


describe('Login', () => {
  const mockUser = {
    _id: '1234567890',
    username: 'testuser',
    email: 'test@test.com',
    password: bcrypt.hashSync('123456', 10), 
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  


  it('Debería devolver un token si las credenciales son válidas', async () => {
    User.findOne.mockResolvedValue(mockUser); 
    bcrypt.compare.mockResolvedValue(true); 

    const res = await request(mockServer)
      .post('/api/auth/login') 
      .send({ email: 'test@test.com', password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();

    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET || 'secretKey');
    expect(decoded.id).toBe(mockUser._id);
    expect(decoded.username).toBe(mockUser.username);
  });

  it('Debería devolver error si el usuario no existe', async () => {
    User.findOne.mockResolvedValue(null); // Simula usuario no encontrado

    const res = await request(mockServer)
      .post('/api/auth/login')
      .send({ email: 'wrong@test.com', password: '123456' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Credenciales inválidas');
  });

  it('Debería devolver error si la contraseña es incorrecta', async () => {
    User.findOne.mockResolvedValue(mockUser); // Usuario encontrado
    bcrypt.compare.mockResolvedValue(false); // Simula que la contraseña no coincide

    const res = await request(mockServer)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'wrongpassword' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Credenciales inválidas');
  });

  it('Debería devolver error si los datos de entrada no son válidos', async () => {
    const res = await request(mockServer)
      .post('/api/auth/login')
      .send({ email: 'invalid-email', password: '123' });

    expect(res.status).toBe(400); 
    expect(res.body.errors).toBeDefined(); 
  });

  it('Debería devolver error 500 si hay un problema en el servidor', async () => {
    User.findOne.mockRejectedValue(new Error('mockServer error')); // Simula error interno

    const res = await request(mockServer)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: '123456' });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Error en el servidor');
  });
});
