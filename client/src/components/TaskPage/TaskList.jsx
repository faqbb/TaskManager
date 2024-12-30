import React from 'react';
import TaskItem from './TaskItem';


const TaskList = ({ tasks }) => {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
