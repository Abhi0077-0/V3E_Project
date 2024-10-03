import React, { useState, useEffect } from 'react';  // Import React and useState, useEffect hooks
import axios from 'axios';  // Import Axios for making HTTP requests
import { useParams, useNavigate } from 'react-router-dom';  // Import hooks for URL parameters and navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesomeIcon for icons
import { faTasks, faInfoCircle } from '@fortawesome/free-solid-svg-icons';  // Import specific icons

const TaskEdit = () => {
  const { id } = useParams();  // Get task ID from the URL parameters
  const [title, setTitle] = useState('');  // State for task title
  const [description, setDescription] = useState('');  // State for task description
  const [completed, setCompleted] = useState(false); // State for task completion status
  const [loading, setLoading] = useState(true);  // Loading state to manage the fetch status
  const [error, setError] = useState(null);  // Error state to manage error messages
  const navigate = useNavigate();  // Initialize navigate function for programmatic navigation

  // Fetch task details when the component mounts
  useEffect(() => {
    axios.get(`https://task-manager-wa-ve3.onrender.com/tasks/${id}`)
      .then(response => {
        const task = response.data;  // Get task data from response
        setTitle(task.title);  // Set title from API data
        setDescription(task.description);  // Set description from API data
        setCompleted(task.completed); // Set completed status from API
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch(err => {
        setError('Failed to load task');  // Set error message on fetch failure
        setLoading(false);  // Set loading to false
      });
  }, [id]);

  // Handle form submission to update the task
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submission
    setLoading(true);  // Set loading to true while updating the task

    axios.put(`https://task-manager-wa-ve3.onrender.com/tasks/${id}`, { 
      title, 
      description, 
      completed // Include completed status in the request
    })
      .then(() => {
        navigate('/');  // Navigate back to the task list after updating
      })
      .catch(err => {
        setError('Failed to update task');  // Set error message if the update fails
      })
      .finally(() => {
        setLoading(false);  // Reset loading status
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-600">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Edit Task
        </h2>

        {/* Display error message if there's an error */}
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {/* Show loading message while fetching task details */}
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading task...</div>
        ) : (
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
                  value={title}  // Bind value to title state
                  onChange={(e) => setTitle(e.target.value)}  // Update title state on input change
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
                  className="w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                  placeholder="Enter task description"
                  rows="8" 
                  value={description}  // Bind value to description state
                  onChange={(e) => setDescription(e.target.value)}  // Update description state on input change
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
                {loading ? 'Updating Task...' : 'Update Task'}  
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskEdit;  // Export the TaskEdit component as default
