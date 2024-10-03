import React, { useState } from 'react';  // Import React and useState hook
import axios from 'axios';  // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom';  // Import useNavigate for programmatic navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesomeIcon for icons
import { faTasks, faInfoCircle } from '@fortawesome/free-solid-svg-icons';  // Import specific icons

const TaskForm = () => {
  // State variables for title, description, loading status, and error
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate for redirecting

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission
    setLoading(true);  // Set loading to true while making the request

    try {
      // Send POST request to add a new task
      await axios.post('https://task-manager-wa-ve3.onrender.com/tasks', { title, description });
      navigate('/');  // Redirect to task list after successfully adding
    } catch (error) {
      setError('Failed to add task');  // Set error state if the request fails
    } finally {
      setLoading(false);  // Reset loading status
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-600">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add a New Task
        </h2>

        {/* Error message display */}
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              Task Title
            </label>
            <div className="mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faTasks} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}  // Update title state on change
                required
              />
            </div>
          </div>

          {/* Description Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              Task Description
            </label>
            <div className="mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faInfoCircle} className="text-gray-400" />
              </div>
              <textarea
                className="w-full pl-20 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                placeholder="Enter task description"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}  // Update description state on change
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-bold rounded-md shadow-md ${
                loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              }`}
              disabled={loading}  // Disable button while loading
            >
              {loading ? 'Adding Task...' : 'Add Task'}  // Change button text based on loading state
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;  // Export the TaskForm component as default
