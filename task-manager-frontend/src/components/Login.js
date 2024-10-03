import React, { useState, useContext } from 'react';  // Import React and necessary hooks
import { AuthContext } from './AuthContext';  // Import the AuthContext for authentication
import { useNavigate } from 'react-router-dom';  // Import hook for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesomeIcon
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';  // Import icons

const Login = () => {
  // State for storing user input
  const [username, setUsername] = useState('');  // State for username
  const [password, setPassword] = useState('');  // State for password
  const { login } = useContext(AuthContext);  // Get login function from AuthContext
  const navigate = useNavigate();  // Initialize navigation
  const [error, setError] = useState(null);  // State for error messages
  const [loading, setLoading] = useState(false);  // State for loading status

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    setLoading(true);  // Set loading to true

    try {
      await login(username, password);  // Call login function with user credentials
      navigate('/');  // Navigate to the homepage on successful login
    } catch (err) {
      setError('Invalid username or password');  // Set error message on failure
    } finally {
      setLoading(false);  // Set loading to false regardless of success or failure
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}  {/* Display error message if present */}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              Username
            </label>
            <div className="mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faUser} className="text-gray-400" />  {/* User icon */}
              </div>
              <input
                type="text"
                className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}  // Update username state
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-gray-400" />  {/* Lock icon */}
              </div>
              <input
                type="password"
                className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // Update password state
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white transition-colors duration-300 ease-in-out ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'  // Disable button when loading
                  : 'bg-blue-500 hover:bg-blue-700'  // Button styles when not loading
              }`}
              disabled={loading}  // Disable button if loading
            >
              {loading ? 'Logging in...' : 'Login'}  {/* Button text changes based on loading status */}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register  {/* Link to registration page */}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;  // Export the Login component as default
