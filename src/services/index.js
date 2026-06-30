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

// Get All Chains
export const getAllChainsApi = async () => {
    try {
        const response = await api.get("/chains/all");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Get All Chains By Group Id
export const getAllChainsByGroupIdApi = async (groupId) => {
    try {
        const response = await api.get(`/chains/groupId/${groupId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

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
export const updateChainApi = async (id, payload) => {
    try {
        const response = await api.patch(`/chains/${id}`, payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Delete Chain
export const deleteChainByIdApi = async (id) => {
    try {
        const response = await api.delete(`/chains/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

/* Brands API -------------------------------------------------- */

// Get All Brands
export const getAllBrandsApi = async () => {
    try {
        const response = await api.get("/brands/all");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Get All Brands By Chain Id
export const getAllBrandsByChainIdApi = async (chainId) => {
    try {
        const response = await api.get(`/brands/chainId/${chainId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Get Brand By Id
export const getBrandByIdApi = async (id) => {
    try {
        const response = await api.get(`/brands/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Add Brand
export const addBrandApi = async (payload) => {
    try {
        const response = await api.post("/brands/add", payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Update Brand
export const updateBrandApi = async (id, payload) => {
    try {
        const response = await api.patch(`/brands/${id}`, payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Delete Brand
export const deleteBrandByIdApi = async (id) => {
    try {
        const response = await api.delete(`/brands/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

/* Zones API -------------------------------------------------- */

// Get All Zones
export const getAllZonesApi = async () => {
    try {
        const response = await api.get("/zones/all");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Get All Zones By Brand Id
export const getAllZonesByBrandIdApi = async (brandId) => {
    try {
        const response = await api.get(`/zones/brandId/${brandId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Get Zone By Id
export const getZoneByIdApi = async (id) => {
    try {
        const response = await api.get(`/zones/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Add Zone
export const addZoneApi = async (payload) => {
    try {
        const response = await api.post("/zones/add", payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Update Zone
export const updateZoneApi = async (id, payload) => {
    try {
        const response = await api.patch(`/zones/${id}`, payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Delete Zone
export const deleteZoneByIdApi = async (id) => {
    try {
        const response = await api.delete(`/zones/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

/* Estimates API -------------------------------------------------- */

// Get All Estimates
export const getAllEstimatesApi = async () => {
    try {
        const response = await api.get("/estimates/all");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Get Estimate By Id
export const getEstimateByIdApi = async (id) => {
    try {
        const response = await api.get(`/estimates/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Add Estimate
export const addEstimateApi = async (payload) => {
    try {
        const response = await api.post("/estimates/add", payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Update Estimate
export const updateEstimateApi = async (id, payload) => {
    try {
        const response = await api.patch(`/estimates/${id}`, payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// Delete Estimate
export const deleteEstimateByIdApi = async (id) => {
    try {
        const response = await api.delete(`/estimates/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}