import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const getTaskById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching task ${id}:`, error);
        return null;
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, task);
        return response.data;
    } catch (error) {
        console.error(`Error updating task ${id}:`, error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting task ${id}:`, error);
        throw error;
    }
};

export const markTaskAsComplete = async (id) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, { isComplete: true });
        return response.data;
    } catch (error) {
        console.error(`Error marking task ${id} as complete:`, error);
        throw error;
    }
};
