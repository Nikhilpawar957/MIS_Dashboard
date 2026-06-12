import api from './api';

// Authentication
export const loginApi = async (payload) => {
    try {
        const response = await api.post('/auth/login', payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Refresh Token
export const refreshTokenApi = async (payload) => {
    try {
        const response = await api.post('/users/refresh-token', payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

