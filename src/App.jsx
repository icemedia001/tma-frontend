import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleEdit = (task) => {
        setTaskToEdit(task);
    };

    const handleSave = () => {
        setTaskToEdit(null);
    };

    return (
        <div>
            <h1>Task Management Application</h1>
            <TaskForm taskToEdit={taskToEdit} onSave={handleSave} />
            <TaskList onEdit={handleEdit} />
        </div>
    );
};

export default App;
