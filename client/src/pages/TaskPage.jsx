import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskPage/TaskList';
import { useSpring, animated } from '@react-spring/web';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { createTask, deleteTask, getTasks, updateTask } from '../service/taskService';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [typingProps, setTypingProps] = useState([]);
  const { user, logout } = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user) {
      fetchTasks(token);
    }
  }, [user]);

  const fetchTasks = async (token) => {
    try {
      const taskList = await getTasks(token);
      setTasks(taskList);
    } catch (error) {
      console.error('Error al obtener tareas:', error.message);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      await createTask(user.token, taskData);
      fetchTasks(user.token); 
    } catch (error) {
      console.error('Error al crear tarea:', error.message);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      await updateTask(user.token, taskId, taskData);
      fetchTasks(user.token); 
    } catch (error) {
      console.error('Error al actualizar tarea:', error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(user.token, taskId);
      fetchTasks(user.token); 
    } catch (error) {
      console.error('Error al eliminar tarea:', error.message);
    }
  };

   const text = "Task Manager."; 
   const letters = text.split("");
   const letterSprings = letters.map((_, index) =>
     useSpring({
       opacity: 1,
       from: { opacity: 0 },
       delay: index * 150,
       config: { duration: 200 }
     })
   );
 
   useEffect(() => {
     setTypingProps(letterSprings);
   }, []);
 
   const TypingEffect = () => (
     <div className="text-2xl pt-serif-bold text-center md:text-start py-5 px-10 max-w-[12rem]">
       {letters.map((letter, index) => (
         <animated.span key={index} style={typingProps[index]}>
           {letter}
         </animated.span>
       ))}
     </div>
   );

   const handleLogout = () => {
      logout()
      navigate('/login')
   }
 

  return (
    <div className="flex ">
      <div className=' flex-col flex justify-between max-h-[100%] bg-[#141414] h-[100vh]'>
        <div>
        <TypingEffect />
        <div className='bg-white text-black pt-serif-bold p-3 mt-6 flex justify-between'>
          <div>Agregar tarea.</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
              <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <div className=' self-center '>
          <button 
            onClick={handleLogout}
            className=" mb-5 p-3 border-0 bg-gradient-to-r from-blue-300 to-violet-300 text-white rounded-lg hover:from-purple-400 hover:to-red-400 transition duration-300 ease-in-out transform hover:scale-105 pt-serif-bold"
          >
            Desloguearme
          </button>
        </div>
      </div>
      <div className='flex  bg-[#141414] mx-8 my-5 rounded-xl w-[100%]'>
        <div className=' bg-black m-5 rounded-lg w-[50%] h-[95%]'>
          <div className='bg-gradient-to-r from-purple-400 to-red-400 text-white rounded-t-lg text-center pt-serif-bold text-2xl py-2'> Pendientes</div>
          <TaskList
            tasks={tasks}
            onToggleCompletion={handleUpdateTask}
            onEditTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            />
        </div>
        <div className=' bg-black m-5 rounded-lg w-[50%] h-[95%]'>
          <div className='bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-t-lg text-center pt-serif-bold text-2xl py-2'>Completadas</div>
          <TaskList
            tasks={tasks}
            onToggleCompletion={handleUpdateTask}
            onEditTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            />
        </div>
      </div>
      
    </div>
  );
};

export default TaskPage;
