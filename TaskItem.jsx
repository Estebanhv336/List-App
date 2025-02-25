import { useState } from "react";

function TaskItem({ task, index, toggleComplete, editTask, deleteTask }) {
  //estado para controlar el modo de edicion
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  //para guardar los cambios
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    if (!editedTitle.trim()) {
      alert("Title is required");
      return;
    }
    editTask(index, editedTitle, editedDescription);
    setIsEditing(false);
  };

  const handlecancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setIsEditing(false);
  };
  return (
    <li className={task.completed ? "completed" : ""}>
      <div className="task-item">
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            ></textarea>
            <button onClick={handleSave}>Save</button>
            <button onClick={handlecancel}>Cancel</button>
          </>
        ) : (
          <div>
            <input
              className="checkbox"
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />
            <span>{task.title}</span>
            <p>{task.description}</p>
            <p className="task-date">
              created on: {new Date(task.createAt).toLocaleDateString()}
            </p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </div>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
