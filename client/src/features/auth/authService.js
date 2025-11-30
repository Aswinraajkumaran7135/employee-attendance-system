import axios from 'axios';

// Get the API URL from the Vite environment file
// Note: import.meta.env.VITE_API_BASE_URL reads from the .env file
const API_URL = import.meta.env.VITE_API_BASE_URL + 'auth/'; 

// Register user
// ... rest of your service code remains the same ...

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;