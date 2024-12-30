import axios from 'axios';

const API_URL = 'https://task-manager-server-n7nd.onrender.com/api/tasks'; // Asegúrate de que esta URL sea la correcta

// Obtener todas las tareas
export const getTasks = async (token, completed) => {
  try { 
    console.log('holaa')
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { completed }, 
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de red');
  }
};

// Obtener una tarea por ID
export const getTaskById = async (token, taskId) => {
  try {
    const response = await axios.get(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de red');
  }
};

// Crear una nueva tarea
export const createTask = async (token, taskData) => {
  try {
    const response = await axios.post(API_URL, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de red');
  }
};

// Actualizar una tarea
export const updateTask = async (token, taskId, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de red');
  }
};

// Eliminar una tarea
export const deleteTask = async (token, taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de red');
  }
};
