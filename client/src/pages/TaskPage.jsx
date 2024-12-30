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
    console.log('User:', user);
    if (user) {
      fetchTasks(user.token);
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
        <TypingEffect />
        <div className=' self-center '>
          <button 
            onClick={handleLogout}
            className=" mb-5 p-3 border-0 bg-gradient-to-r from-purple-300 to-red-300 text-white rounded-lg hover:from-purple-400 hover:to-red-400 transition duration-300 ease-in-out transform hover:scale-105 pt-serif-bold"
          >
            Desloguearse
          </button>
        </div>
      </div>
      <div className='flex flex-col bg-[#141414] m-8 rounded-xl w-[100%]'>
        <div>
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
