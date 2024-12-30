import axios from 'axios';

export const loginService = async (email, password) => {
  try {
    const response = await axios.post('https://task-manager-server-n7nd.onrender.com/api/auth/login', {
      email,
      password
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token); 
      return { success: true }; 
    } else {
      throw new Error('Token no recibido');
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error de red');
  }
};
