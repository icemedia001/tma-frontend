import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';

const TaskForm = ({ taskToEdit, onSave }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDueDate(taskToEdit.dueDate);
        }
    }, [taskToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const task = { title, dueDate };
        if (taskToEdit) {
            await updateTask(taskToEdit.id, task);
        } else {
            await createTask(task);
        }
        setTitle('');
        setDueDate('');
        onSave();
    };

    return (
        <div>
            <h2>{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <button type="submit">{taskToEdit ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default TaskForm;
