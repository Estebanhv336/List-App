import React from "react";
import TaskItem from "./TaskItem";

// TaskList component to display the list of tasks
function taskList({ tasks, toggleComplete, editTask, deleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          toggleComplete={toggleComplete}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default taskList;
