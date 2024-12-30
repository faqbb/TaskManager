import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { loginService } from '../service/authService';
import axios from 'axios';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
      // Usamos el token para obtener la información del usuario
      fetchUserData(storedToken);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('https://task-manager-server-n7nd.onrender.com/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setUser(response.data); 
    } catch (error) {
      console.error('Error al obtener los datos del usuario', error);
      logout(); 
    }
  };

  // Función para login
  const login = async (email, password) => {
    const result = await loginService(email, password);
    if (result.success) {
      setIsAuthenticated(true);
      setUser(result.user); 
      localStorage.setItem('user', JSON.stringify(result.user)); 
    }
  };

  // Función para logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    setUser(null); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
