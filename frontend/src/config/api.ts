export const API_BASE_URL = 'http://localhost:8080';


export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  ME: `${API_BASE_URL}/auth/me`,

  PREDICTIONS: `${API_BASE_URL}/api/predictions`,

  PROFILE: `${API_BASE_URL}/users/me`,

  ADMIN_USERS: `${API_BASE_URL}/admin/users`,
};
