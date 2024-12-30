import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { deleteTask, updateTask } from '../../service/taskService';
import Swal from 'sweetalert2';
import TaskEditModal from './TaskEditModal';
import { useTransition, animated } from '@react-spring/web';  

const TaskList = ({ tasks , setPendingTasks, setCompletedTasks }) => {
  const [editTask, setEditTask] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const updatedTaskData = {
        ...currentStatus,
        completed: !currentStatus.completed, 
      };

      const token = localStorage.getItem('token');
      if (token) {  
        const updatedTask = await updateTask(token, taskId, updatedTaskData);
        console.log('Tarea actualizada', updatedTask);
        Swal.fire({
          icon: 'success',
          title: 'Tarea actualizada',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          background: '#2d2d2d', 
          color: 'white',
          iconColor: '#4ade80'
        });
        setCompletedTasks([])
      }
    } catch (error) {
      console.error('Error al actualizar la tarea:', error.message);
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task); 
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setEditTask(null);
  };

  const handleSaveEdit = async (updatedTaskData) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const updatedTask = await updateTask(token, editTask._id, updatedTaskData);
        console.log('Tarea actualizada', updatedTask);
        Swal.fire({
          title: 'Tarea Actualizada',
          icon:'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#2d2d2d', 
          color: 'white',
          iconColor: '#4ade80'
        });
        handleCloseModal();
        setPendingTasks([]) 
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
    }
  };

  const handleDeleteTask = async (taskID) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: 'Una vez eliminada, esta tarea no se puede recuperar.',
          icon: 'warning',
          iconColor: '#f87171',
          background: '#141414',
          showCancelButton: true,
          color: '#fff',
          confirmButtonColor: '#4ade80',
          cancelButtonColor: '#f87171',
          confirmButtonText: 'Sí, eliminar.',
          cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
          const deletedTask = await deleteTask(token, taskID);
          Swal.fire('Eliminado!', 'La tarea ha sido eliminada.', 'success');
          setCompletedTasks([])
          console.log('Tarea eliminada ', deletedTask);
        }
      } else {
        console.error('Token no disponible');
      }
    } catch (error) {
      console.error('Error al eliminar la tarea:', error.message);
    }
  };

  // Animaciones para las tareas
  const transitions = useTransition(tasks, {
    keys: (task) => task._id, 
    from: { opacity: 0, transform: 'translateY(-20px)' },  
    enter: { opacity: 1, transform: 'translateY(0px)' },  
    leave: { opacity: 0, transform: 'translateY(20px)' },  
    config: { tension: 200, friction: 20 },  
  });

  return (
    <div>
      <ul>
        {transitions((style, task) => (
          <animated.li key={task._id} style={style}>
            <TaskItem
              task={task}
              onToggleComplete={handleToggleComplete}
              onToggleEdit={handleEditTask}
              onToggleDelete={handleDeleteTask}
            />
          </animated.li>
        ))}
      </ul>

      {showModal && (
        <TaskEditModal  
          task={editTask} 
          onClose={handleCloseModal} 
          onSave={handleSaveEdit} 
        />
      )}
    </div>
  );
};

export default TaskList;
