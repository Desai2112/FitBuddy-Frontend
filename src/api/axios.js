// src/api/axios.js
import axios from 'axios';

// Get the backend URL from environment variables
const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: backendURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/sessions if you're using them
});

export default axiosInstance;