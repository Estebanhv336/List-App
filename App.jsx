import { useState, useEffect } from "react";
import "./styles.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const addTask = (newTask) => {
    const taskWithDate = {
      ...newTask,
      createAt: new Date().toISOString(),
    };
    setTasks([...tasks, taskWithDate]);
  };
  useEffect(() => {
    const storedtasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedtasks) {
      setTasks(storedtasks);
    }
  }, []);
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const toggleComplete = (index) => {
    const updateTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );

    setTasks(updateTasks);
  };

  const editTask = (index, newTitle, newDescription) => {
    const updateTasks = tasks.map((task, i) =>
      i === index
        ? { ...task, title: newTitle, description: newDescription }
        : task
    );
    setTasks(updateTasks);
  };
  const deleteTask = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };
  const sortTasks = (tasks) => {
    return [...tasks].sort((a, b) => {
      if (sortOrder === "name") {
        return a.title.localeCompare(b.title);
      }
      if (sortOrder === "status") {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      }
      return 0; // No ordenar si es "none"
    });
  };

  const filteredTasks = sortTasks(
    tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true; // Mostrar todas las tareas
    })
  );

  return (
    <div className="app-container">
      <h1>My-List-App</h1>
      <TaskForm addTask={addTask} />
      <div className="filter-buttons">
        <div className="sort-buttons">
          <button onClick={() => setSortOrder("none")}>Default</button>
          <button onClick={() => setSortOrder("name")}>Sort by Name</button>
          <button onClick={() => setSortOrder("status")}>Sort by Status</button>
        </div>

        <button onClick={() => setFilter("all")}>all</button>
        <button onClick={() => setFilter("completed")}>completed</button>
        <button onClick={() => setFilter("pending")}>pending</button>
      </div>
      <TaskList
        tasks={filteredTasks}
        toggleComplete={toggleComplete}
        editTask={editTask}
        deleteTask={deleteTask}
      />
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}

export default App;
