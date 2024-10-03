import React, { useState, useEffect } from 'react';  // Import React and hooks
import axios from 'axios';  // Import Axios for making HTTP requests
import { Link } from 'react-router-dom';  // Import Link for navigation between routes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Import FontAwesomeIcon for icons
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';  // Import specific icons

const TaskList = () => {
  // State variables
  const [tasks, setTasks] = useState([]);  // State for storing tasks
  const [loading, setLoading] = useState(true);  // State to indicate loading status
  const [error, setError] = useState(null);  // State for error handling

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    axios.get('https://task-manager-wa-ve3.onrender.com/tasks')  // API call to get tasks
      .then(response => {
        setTasks(response.data);  // Update tasks state with fetched data
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch(error => {
        setError('Failed to fetch tasks');  // Set error state if the API call fails
        setLoading(false);  // Set loading to false
      });
  }, []);  // Empty dependency array to run effect only on mount

  // Function to handle task deletion
  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {  // Confirm deletion
      axios
        .delete(`https://task-manager-wa-ve3.onrender.com/tasks/${taskId}`)  // API call to delete task
        .then(() => {
          setTasks(tasks.filter(task => task.id !== taskId));  // Remove deleted task from the state
        })
        .catch(err => {
          console.error('Failed to delete task', err);  // Log error in the console
          alert('Failed to delete task');  // Optional alert for user feedback
        });
    }
  };

  // Render loading state or error state
  if (loading) return <div className="text-center mt-10 text-lg text-gray-500">Loading tasks...</div>;
  if (error) return <div className="text-center mt-10 text-lg text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-600 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-5xl">
        {/* Add New Task Button */}
        <div className="flex justify-end mb-8">
          <Link
            to="/tasks/new"  // Link to add a new task
            className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-md shadow-md"
          >
            Add New Task
          </Link>
        </div>

        {/* Task List Title */}
        <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">
          Your Task List
        </h1>

        {/* Task List */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (  // Map through tasks to create list items
            <li key={task.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {task.title}  {/* Task title */}
                  </h3>
                  <p className="text-gray-600">{task.description}</p>  {/* Task description */}
                </div>
                <div className="flex space-x-4">
                  {/* Edit Task Link */}
                  <Link to={`/tasks/${task.id}/edit`} className="text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faEdit} />  {/* Edit icon */}
                  </Link>
                  {/* Delete Task Button */}
                  <button
                    onClick={() => handleDelete(task.id)}  // Call handleDelete on click
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />  {/* Delete icon */}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;  // Export the TaskList component as default
