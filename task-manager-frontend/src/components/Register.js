import React, { useState } from 'react';  // Import React and necessary hooks
import axios from 'axios';  // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom';  // Import hook for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesomeIcon
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';  // Import icons

const Register = () => {
  // State for storing user input
  const [username, setUsername] = useState('');  // State for username
  const [email, setEmail] = useState('');  // State for email
  const [password, setPassword] = useState('');  // State for password
  const [confirmPassword, setConfirmPassword] = useState('');  // State for confirming password
  const [error, setError] = useState(null);  // State for error messages
  const [loading, setLoading] = useState(false);  // State for loading status
  const navigate = useNavigate();  // Initialize navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    setLoading(true);  // Set loading to true

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);  // Reset loading state
      return;  // Exit the function
    }

    try {
      // Simulate registration request
      await axios.post('https://task-manager-wa-ve3.onrender.com/register', { username, email, password });
      navigate('/login');  // Navigate to the login page on successful registration
    } catch (err) {
      setError("Registration failed");  // Set error message on failure
    } finally {
      setLoading(false);  // Set loading to false regardless of success or failure
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create an Account
        </h2>

        {error && (  // Display error message if present
          <p className="text-red-500 text-center mb-4">
            {error}
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

          {/* Email Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />  {/* Email icon */}
              </div>
              <input
                type="email"
                className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Update email state
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

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-gray-400" />  {/* Lock icon */}
              </div>
              <input
                type="password"
                className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}  // Update confirm password state
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
                  : 'bg-green-500 hover:bg-green-700'  // Button styles when not loading
              }`}
              disabled={loading}  // Disable button if loading
            >
              {loading ? 'Registering...' : 'Register'}  {/* Button text changes based on loading status */}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-green-500 hover:underline">
            Login  {/* Link to login page */}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;  // Export the Register component as default
