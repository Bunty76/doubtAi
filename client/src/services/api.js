import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5005/api/doubts' : '/api/doubts');

export const askDoubt = async (question, subject, modelId) => {
    const response = await axios.post(`${API_URL}/ask`, { question, subject, modelId });
    return response.data;
};

export const getHistory = async () => {
    const response = await axios.get(`${API_URL}/history`);
    return response.data;
};
