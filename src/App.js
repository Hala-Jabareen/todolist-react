import "./App.css";
import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState(""); 
  const [isEditing, setIsEditing] = useState(false); 
  const [editedTask, setEditedTask] = useState(""); 
  const [selectedTaskId, setSelectedTaskId] = useState(null); 


  
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]); 
      setNewTask(""); 
    }
    
  };

  const handleEdit = (i) => {
    setIsEditing(true);
    setEditedTask(tasks[i].text);
    setSelectedTaskId(i);
    
  };

  const handleSave = () => {
    if (editedTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[selectedTaskId].text = editedTask;
      setTasks(updatedTasks);
      setIsEditing(false);
      setEditedTask("");
      setSelectedTaskId(null);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const handleDelete = (Id) => {
    const updatedTasks = tasks.filter((_, i) => i !== Id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleCheckboxChange = (i) => {
    const updatedTasks = [...tasks];
    updatedTasks[i].completed = !updatedTasks[i].completed;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const storageTasks = JSON.parse(localStorage.getItem("tasks"))||[];
    setTasks(storageTasks);
  }, []);

  return (
    <div className="todo-container">
      <h1>
        <span className="second-title">Todo List App</span>
      </h1>
      <form onSubmit={handleAddTask}>
        <input
          className="add-task"
          type="text"
          placeholder="Add new task ..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </form>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div className="todo" key={index}>
            <div className="todo-text">
              <input
                className="checkbox"
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(index)}
              />
              {isEditing && selectedTaskId === index ? (
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              ) : (
                <div className={task.completed ? "completed-task" : ""}>{task.text}</div>
              )}
            </div>
            <div className="todo-actions">
              {isEditing && selectedTaskId === index ? (
                <button className="submit-edits" onClick={handleSave}>
                  Done
                </button>
              ) : (
                <button className="submit-edits" onClick={() => handleEdit(index)}>
                  Edit
                </button>
              )}
              <button className="submit-edits" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
