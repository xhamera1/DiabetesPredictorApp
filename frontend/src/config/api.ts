const API_BASE_URL = 'http://localhost:8080';

const ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    GET_ME: `${API_BASE_URL}/auth/me`,

    PREDICTIONS: `${API_BASE_URL}/api/predictions`,

    ADMIN_USERS: `${API_BASE_URL}/admin/users`,
};

export default ENDPOINTS;