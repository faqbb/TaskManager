import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskPage/TaskList';
import { useSpring, animated } from '@react-spring/web';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { createTask, getTasks } from '../service/taskService';
import TaskAddModal from '../components/TaskPage/TaskAddModal';
import Swal from 'sweetalert2';

const TaskPage = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para la visibilidad de la sidebar

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user) {
      fetchTasks(token);
    }
  }, [user, pendingTasks, completedTasks]);

  const fetchTasks = async (token) => {
    try {
      const taskList = await getTasks(token);
      const completedTasks = taskList.filter(task => task.completed);
      const pendingTasks = taskList.filter(task => !task.completed);
      setCompletedTasks(completedTasks);
      setPendingTasks(pendingTasks);
    } catch (error) {
      console.error('Error al obtener tareas:', error.message);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        console.error('Token no encontrado');
        return;
      }

      if(token) {
        const newTask = await createTask(token, taskData);
        Swal.fire({
          icon: 'success',
          title: 'Tarea agregada',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          background: '#2d2d2d', 
          color: 'white',
          iconColor: '#4ade80'
        });
        console.log('Tarea creada', newTask)
        setPendingTasks([])
      }
      setIsModalOpen(false); 
    } catch (error) {
      console.error('Error al crear tarea:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar tarea',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#2d2d2d', 
        color: 'white',
        iconColor: '#f87171'
      });
      setIsModalOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const text = "Task Manager.";
  const letters = text.split("");
  const letterSprings = letters.map((_, index) =>
    useSpring({
      opacity: 1,
      from: { opacity: 0 },
      delay: index * 150,
      config: { duration: 200 },
    })
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Función para alternar la visibilidad de la sidebar

  return (
    <div className="flex">
  {/* sidebar */}
  <div
    className={`flex-col flex justify-between max-h-[100%] bg-[#141414] h-[100vh] transition-all 
      ${isSidebarOpen ? 'w-[70%] md:w-[250px]' : 'w-0 md:w-[250px] hidden'} md:flex`}  // Visibilidad en escritorio
  >
    <div>
      <div className="text-2xl pt-serif-bold text-center md:text-start py-5 px-10 max-w-[12rem]">
        {letters.map((letter, index) => (
          <animated.span key={index} style={letterSprings[index]}>
            {letter}
          </animated.span>
        ))}
      </div>

      <div className="bg-white text-black pt-serif-bold p-3 mt-6 flex justify-between">
        <div>Agregar tarea.</div>
        <button
          className="hover:scale-125 bg-transparent p-0"
          onClick={openModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
            <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <div className="self-center">
      <button
        onClick={handleLogout}
        className="mb-5 p-4 border-0 bg-gradient-to-r from-blue-300 to-violet-300 text-white rounded-lg hover:from-purple-400 hover:to-red-400 transition duration-300 ease-in-out transform hover:scale-105 pt-serif-bold"
      >
        Desloguearme
      </button>
    </div>
  </div>
  {/* Fin de sidebar */}

  {/* Botón de menú hamburguesa */}
  <button
    onClick={toggleSidebar}
    className="lg:hidden p-4 text-white z-50 absolute top-4 right-4"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </button>

  {/* Contenido principal con tareas */}
  <div
    className={`flex-col flex md:flex-row bg-[#141414] items-center mt-24 md:mt-0 md:mx-8 my-5 rounded-xl w-[100%] ${isSidebarOpen ? 'md:flex hidden' : 'flex'}`}
  >
    <div className="bg-black m-5 rounded-lg w-[100%] h-[95%] md:w-[50%]">
      <div className="bg-gradient-to-r from-purple-400 to-red-400 text-white rounded-t-lg text-center pt-serif-bold text-2xl py-2">Pendientes</div>
      <TaskList tasks={pendingTasks} setCompletedTasks={setCompletedTasks} setPendingTasks={setPendingTasks}/>
    </div>

    <div className="bg-black m-5 rounded-lg w-[100%] h-[95%] md:w-[50%]">
      <div className="bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-t-lg text-center pt-serif-bold text-2xl py-2">Completadas</div>
      <TaskList tasks={completedTasks} setCompletedTasks={setCompletedTasks} setPendingTasks={setPendingTasks} />
    </div>
  </div>

  {/* Modal de Tarea */}
  <TaskAddModal
    isOpen={isModalOpen}
    onClose={closeModal}
    onSave={handleAddTask}
  />
</div>

  );
};

export default TaskPage;
