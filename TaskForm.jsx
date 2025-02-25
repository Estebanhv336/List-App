import { useState } from "react";

function taskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is rquired");
      return;
    }
    addTask({ title, description, completed: false });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-Form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="task-title"
        name="Title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type=" text"
        id="task-description"
        name="Description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit"> Add Task</button>
    </form>
  );
}

export default taskForm;
