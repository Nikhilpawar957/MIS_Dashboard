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

// Registeration
export const registerApi = async (payload) => {
    try {
        const response = await api.post('/users/register', payload);
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

// Get All Users
export const getUsersApi = async () => {
    try {
        const response = await api.get('/users/all');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Get User By ID
export const getUserByIdApi = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Create User
export const createUserApi = async (payload) => {
    try {
        const response = await api.post('/users/register', payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Change User Status
export const changeUserStatusApi = async (payload) => {
    try {
        const response = await api.post('/users/change-status', payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

/* Groups API -------------------------------------------------- */

// Get All Groups
export const getAllGroupsApi = async () => {
    try {
        const response = await api.get("/groups/all");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Get Group By ID
export const getGroupByIdApi = async (id) => {
    try {
        const response = await api.get(`/groups/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Add Group
export const addGroupApi = async (payload) => {
    try {
        const response = await api.post('/groups/add', payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Update Group
export const updateGroupApi = async (id, payload) => {
    try {
        const response = await api.patch(`/groups/${id}`, payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

//Delete Group
export const deleteGroupByIdApi = async (id) => {
    try {
        const response = await api.delete(`/groups/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

/* Chains API -------------------------------------------------- */

// Get Chain By Id
export const getChainByIdApi = async (id) => {
    try {
        const response = await api.get(`/chains/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Add Chain
export const addChainApi = async (payload) => {
    try {
        const response = await api.post("/chains/add", payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Update Chain
export const updateChainApi = async(id, payload) => {
    try {
        const response = await api.patch(`/chains/${id}`, payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Delete Chain
export const deleteChainByIdApi = async(id) => {
    try {
        const response = await api.delete(`/chains/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}