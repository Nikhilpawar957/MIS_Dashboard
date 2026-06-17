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
        const response = await api.post('/auth/refresh-token', payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Forgot Password
export const forgotPasswordApi = async (payload) => {
    try {
        const response = await api.post('/auth/forgot-password', payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Reset Password
export const resetPasswordApi = async (payload) => {
    try {
        const response = await api.post('/auth/reset-password', payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}