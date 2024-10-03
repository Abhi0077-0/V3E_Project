import React, { useState, useEffect } from 'react';  // Import React and necessary hooks
import { useParams, Link } from 'react-router-dom';  // Import hooks for URL parameters and navigation
import axios from 'axios';  // Import Axios for making HTTP requests

const TaskDetails = () => {
  const { id } = useParams();  // Get task ID from the URL parameters
  const [task, setTask] = useState(null);  // State to store task details
  const [loading, setLoading] = useState(true);  // Loading state to manage fetch status
  const [error, setError] = useState(null);  // Error state to manage error messages

  // Fetch task details when the component mounts
  useEffect(() => {
    axios.get(`https://task-manager-wa-ve3.onrender.com/tasks/${id}`)
      .then(response => {
        setTask(response.data);  // Set task details from API response
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch(error => {
        setError('Failed to fetch task details');  // Set error message if the fetch fails
        setLoading(false);  // Set loading to false
      });
  }, [id]);

  // Show loading message while fetching task details
  if (loading) return <div>Loading...</div>;

  // Show error message if there's an error
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{task.title}</h1>  {/* Display task title */}
      <p className="text-gray-700">{task.description}</p>  {/* Display task description */}
      <div className="mt-6">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          Back to Tasks  {/* Link to navigate back to the task list */}
        </Link>
      </div>
    </div>
  );
};

export default TaskDetails;  // Export the TaskDetails component as default
