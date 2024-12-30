import React from 'react';

const TaskItem = ({ task }) => {


  return (
    <li style={{ listStyleType: 'none' }}>
      <div>
        {task.title}
      </div>
    </li>
  );
};

export default TaskItem;
