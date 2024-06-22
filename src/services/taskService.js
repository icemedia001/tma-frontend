import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

const getLocalTasks = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

const saveLocalTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        const tasks = response.data;
        saveLocalTasks(tasks);
        return tasks;
    } catch (error) {
        return getLocalTasks();
    }
};

export const getTaskById = async (id) => {
    const tasks = getLocalTasks();
    return tasks.find(task => task.id === id);
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        const newTask = response.data;
        const tasks = getLocalTasks();
        tasks.push(newTask);
        saveLocalTasks(tasks);
        return newTask;
    } catch (error) {
        const tasks = getLocalTasks();
        task.id = Date.now().toString();
        tasks.push(task);
        saveLocalTasks(tasks);
        return task;
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, task);
        const updatedTask = response.data;
        const tasks = getLocalTasks().map(t => t.id === id ? updatedTask : t);
        saveLocalTasks(tasks);
        return updatedTask;
    } catch (error) {
        const tasks = getLocalTasks().map(t => t.id === id ? { ...t, ...task } : t);
        saveLocalTasks(tasks);
        return { id, ...task };
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        const tasks = getLocalTasks().filter(task => task.id !== id);
        saveLocalTasks(tasks);
    } catch (error) {
        const tasks = getLocalTasks().filter(task => task.id !== id);
        saveLocalTasks(tasks);
    }
};

export const markTaskAsComplete = async (id) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/complete`);
        const updatedTask = response.data;
        const tasks = getLocalTasks().map(t => t.id === id ? updatedTask : t);
        saveLocalTasks(tasks);
        return updatedTask;
    } catch (error) {
        const tasks = getLocalTasks().map(t => t.id === id ? { ...t, isComplete: true } : t);
        saveLocalTasks(tasks);
        return tasks.find(t => t.id === id);
    }
};
