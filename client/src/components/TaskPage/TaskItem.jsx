import React from 'react';

const TaskItem = ({ task, onToggleComplete, onToggleEdit, onToggleDelete }) => {


  return (
    <div className=' rounded-xl bg-white p-5 text-black pt-serif-bold m-5 flex justify-between'>
      <div>
        {task.title}
        <p className='pt-serif-regular'>{task.description}</p>
      </div>
      <div className='flex'>
        {task.completed ? null : <button className='bg-gradient-to-r from-yellow-100 to-green-400 text-white pt-serif-bold  px-3 py-1 hover:scale-110 shadow-md me-2 border-0'
        onClick={() => onToggleComplete(task._id, task.completed)}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1" id="Capa_1" width="18px" height="18px" viewBox="0 0 335.765 335.765" xmlSpace="preserve">
                <g>
                  <g>
                    <polygon points="311.757,41.803 107.573,245.96 23.986,162.364 0,186.393 107.573,293.962 335.765,65.795   "/>
                  </g>
                </g>
                </svg>
          </button>}
        <div className='flex flex-col gap-2 items-end'>
          <button className='bg-gradient-to-r from-purple-400 to-red-400 text-white pt-serif-bold  px-3 py-1 hover:scale-110 shadow-md border-0'
            onClick={() => onToggleDelete(task)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="18px" height="18px" viewBox="-3.5 0 19 19" className="cf-icon-svg">
            <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"/>
            </svg>
          </button>
           <button className='bg-gradient-to-r from-orange-400 to-yellow-400 text-white pt-serif-bold  px-3 py-1 hover:scale-110 shadow-md border-0'
           onClick={() => onToggleEdit(task)}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 16 16" fill="none">
                <path d="M8.29289 3.70711L1 11V15H5L12.2929 7.70711L8.29289 3.70711Z" fill="#000000"/>
                <path d="M9.70711 2.29289L13.7071 6.29289L15.1716 4.82843C15.702 4.29799 16 3.57857 16 2.82843C16 1.26633 14.7337 0 13.1716 0C12.4214 0 11.702 0.297995 11.1716 0.828428L9.70711 2.29289Z" fill="#000000"/>
            </svg>
        </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
