import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask, markTaskAsComplete } from '../services/taskService';

const TaskList = ({ onEdit }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    const handleComplete = async (id) => {
        await markTaskAsComplete(id);
        fetchTasks();
    };

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
                            {task.title} - {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        <button onClick={() => onEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                        {!task.isComplete && (
                            <button onClick={() => handleComplete(task.id)}>Complete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
