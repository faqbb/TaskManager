import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginPage/LoginForm';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      navigate('/tasklist')
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: error.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            background: '#2d2d2d', 
            color: 'white',
            iconColor: '#d8b4fe'
          });
    }
  };

  return (
    <div className='bg-black flex  w-[100%] h-[100vh] items-center justify-center '>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
