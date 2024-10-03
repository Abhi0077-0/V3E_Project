import React, { createContext, useState, useEffect } from 'react';  // Import necessary React components
import axios from 'axios';  // Import axios for making HTTP requests

// Create a context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold user information and token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Effect to set the authorization header and load user information if token exists
  useEffect(() => {
    if (token) {
      // Set the default authorization header for axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Retrieve and set user information from localStorage
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [token]);  // Depend on token

  // Login function to authenticate the user
  const login = async (username, password) => {
    try {
      // Send POST request to login endpoint
      const response = await axios.post('https://task-manager-wa-ve3.onrender.com/login', { username, password });
      // Set token from response and store it in localStorage
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      // Decode user info from token and set it in state and localStorage
      const user = JSON.parse(atob(response.data.token.split('.')[1]));
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error(error);  // Log any error during login
    }
  };

  // Logout function to clear user data and token
  const logout = () => {
    setUser(null);  // Clear user state
    setToken('');  // Clear token state
    localStorage.removeItem('token');  // Remove token from localStorage
    localStorage.removeItem('user');  // Remove user from localStorage
  };

  // Provide user, token, login, and logout methods to children components
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthContext and AuthProvider for use in other components
export { AuthContext, AuthProvider };
