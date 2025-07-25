import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const vehicleAPI = {
  getAll: () => apiClient.get('/vehicles'),
  getById: (id) => apiClient.get(`/vehicles/${id}`),
  create: (data) => apiClient.post('/vehicles', data),
  update: (id, data) => apiClient.put(`/vehicles/${id}`, data),
  delete: (id) => apiClient.delete(`/vehicles/${id}`),
  updateLocation: (id, location) => apiClient.put(`/vehicles/${id}/location`, location),
};

export const driverAPI = {
  getAll: () => apiClient.get('/drivers'),
  getById: (id) => apiClient.get(`/drivers/${id}`),
  create: (data) => apiClient.post('/drivers', data),
  update: (id, data) => apiClient.put(`/drivers/${id}`, data),
  delete: (id) => apiClient.delete(`/drivers/${id}`),
};

export const fuelAPI = {
  getTheftAlerts: () => apiClient.get('/fuel/theft-alerts'),
  reportTheft: (data) => apiClient.post('/fuel/report-theft', data),
  getFuelEfficiency: () => apiClient.get('/fuel/efficiency'),
};

export default apiClient;
