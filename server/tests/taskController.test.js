import request from 'supertest';
import Task from '../models/Task';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { configDotenv } from 'dotenv';
import mockServer from './mockServer.js';

jest.mock('../models/Task.js');
jest.mock('../models/User.js');
jest.mock('bcryptjs');


configDotenv({path: '.env.test'});

let authToken
const mockUser = {
  _id: 'mockUserId',
  email: 'test@test.com',
  username: 'testuser',
  password: bcrypt.hashSync('123456', 10), 
}; 

beforeAll(async () => {
  User.findOne.mockResolvedValue(mockUser); 
  bcrypt.compare.mockResolvedValue(true); 

  const response = await request(mockServer)
    .post('/api/auth/login') 
    .send({
      email: 'test@test.com', 
      password: '123456', 
    });

  authToken = response.body.token;
  console.log(authToken);

  expect(authToken).toBeDefined();
});

afterAll(async () => {
  mockServer.close();  
});


describe('Task Routes', () => {
  describe('GET /api/tasks', () => {
    it('Debería devolver todas las tareas', async () => {
      const mockTasks = [
        { _id: '1', title: 'Task 1', description: 'Description 1', completed: false },
        { _id: '2', title: 'Task 2', description: 'Description 2', completed: true }
      ];
      Task.find.mockResolvedValue(mockTasks);
      const response = await request(mockServer)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`); 
      expect(response.status).toBe(200); 
      expect(response.body).toEqual(mockTasks); 
    });
  });

    it('Debería devolver error 500 si falla la base de datos', async () => {
      Task.find.mockRejectedValue(new Error('Database error'));
      const response = await request(mockServer)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`); 
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('Debería devolver una tarea por ID', async () => {
      const task = { _id: '1', title: 'Task 1', description: 'Description 1', completed: false };

      Task.findById.mockResolvedValue(task);

      const response = await request(mockServer)
      .get('/api/tasks/1')
      .set('Authorization', `Bearer ${authToken}`); 
      expect(response.status).toBe(200);
      expect(response.body).toEqual(task);
    });

    it('Debería devolver error 404 si no encuentra la tarea', async () => {
      Task.findById.mockResolvedValue(null);

      const response = await request(mockServer)
      .get('/api/tasks/1')
      .set('Authorization', `Bearer ${authToken}`); 
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Tarea no encontrada');
    });
  });

  describe('POST /api/tasks', () => {
    it('Debería crear una nueva tarea', async () => {
      const newTask = { title: 'New Task', description: 'Description', completed: false };
      Task.prototype.save.mockResolvedValue(newTask);

      const response = await request(mockServer)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newTask);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newTask);
    });

    it('Debería devolver error 400 si hay errores de validación', async () => {
      const response = await request(mockServer)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: '', description: '' });

      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual([{ 
        msg: 'Title is required',
        location: "body",
        msg: "El título es obligatorio",
        path: "title",
        type: "field",
        value: "",
       }]);
    });


  it('Debería actualizar una tarea', async () => {
    const updatedTask = { _id: '1', title: 'Updated Task', description: 'Updated description', completed: true };
    const task = { _id: '1', title: 'Old Task', description: 'Old description', completed: false, createdAt: new Date() };
    
    Task.prototype.save.mockResolvedValue(updatedTask);

    const createResponse = await request(mockServer)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send(task);

    Task.findById.mockResolvedValue(task);

    const updateResponse = await request(mockServer)
      .put('/api/tasks/1')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedTask);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toEqual(updatedTask);
  });

    it('Debería devolver error 404 si no encuentra la tarea a actualizar', async () => {
      Task.findById.mockResolvedValue(null);

      const response = await request(mockServer)
        .put('/api/tasks/1')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Updated Task' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Tarea no encontrada');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('Debería eliminar una tarea', async () => {
      const task = { _id: '1', title: 'Task to delete', description: 'Description' };

      Task.findByIdAndDelete.mockResolvedValue(task);

      const response = await request(mockServer)
        .delete('/api/tasks/1')
        .set('Authorization', `Bearer ${authToken}`); 

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Tarea eliminada correctamente');
    });

    it('Debería devolver error 404 si no encuentra la tarea a eliminar', async () => {
      Task.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(mockServer)
        .delete('/api/tasks/1')
        .set('Authorization', `Bearer ${authToken}`); 

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Tarea no encontrada');
    });
  });
