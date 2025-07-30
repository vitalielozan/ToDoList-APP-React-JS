import axios from 'axios';

const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5001/api/tasks'
    : '/api/tasks';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
