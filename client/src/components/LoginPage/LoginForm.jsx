import React, { useEffect, useState } from 'react';
import { useSpring, animated } from "@react-spring/web";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typingProps, setTypingProps] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  // Detectar si es móvil
  const isMobile = window.innerWidth < 640;

  // Animaciones
  const slideInRight = useSpring({
    transform: 'translateX(0%)', 
    from: { transform: 'translateX(100%)' }, 
    config: { duration: 1000 }, 
  });

  const slideInBottom = useSpring({
    transform: 'translateY(0%)', 
    from: { transform: 'translateY(100%)' }, 
    config: { duration: 1000 }, 
  });

  const fadeInSecondText = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 2250, 
    config: { duration: 2000 }, 
  });

  // Inicializar animaciones de texto
  const text = "Inicia Sesión."; 
  const letters = text.split("");
  const letterSprings = letters.map((_, index) =>
    useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: index * 150, // Delay progresivo para cada letra
      config: { duration: 200 }
    })
  );

  useEffect(() => {
    setTypingProps(letterSprings);
  }, []); // Solo se ejecuta una vez al renderizar el componente

  const TypingEffect = () => (
    <div className="text-8xl pt-serif-bold text-center md:text-start">
      {letters.map((letter, index) => (
        <animated.span key={index} style={typingProps[index]}>
          {letter}
        </animated.span>
      ))}
    </div>
  );

  return (
    <form className="flex self-center flex-col md:flex-row" onSubmit={handleSubmit}>
      <div className="flex flex-col max-w-[22rem]">
        <div className="text-5xl md:text-8xl pt-serif-bold">
          <TypingEffect/> 
        </div>
        <animated.div style={fadeInSecondText}>
            <p className="text-xs self-end pe-7 text-center md:text-end pt-serif-bold">Por favor</p>
        </animated.div>
      </div>
      <animated.div 
        className="flex flex-col gap-5 mt-4 relative px-8 rounded-lg shadow-lg pt-serif-bold" 
        style={isMobile ? slideInBottom : slideInRight}
      >
        <div className='flex flex-col gap-2'>
          <label className="text-lg font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className="text-lg pt-serif-bold">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <button 
          type="submit" 
          className="mt-2 p-3 border-0 bg-gradient-to-r from-purple-300 to-red-300 text-white rounded-lg hover:from-purple-400 hover:to-red-400 transition duration-300 ease-in-out transform hover:scale-105 pt-serif-bold"
        >
          Iniciar Sesión
        </button>
      </animated.div>
    </form>
  );
}

export default LoginForm;
