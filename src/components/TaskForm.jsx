import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    isComplete: false,
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask(newTask);
      setNewTask({
        title: '',
        dueDate: '',
        isComplete: false,
        description: ''
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
