import React, { useContext } from 'react';  // Import React and useContext hook
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Import necessary components from React Router
import TaskList from './components/TaskList';  // Import TaskList component
import TaskForm from './components/TaskForm';  // Import TaskForm component for creating new tasks
import TaskDetails from './components/TaskDetails';  // Import TaskDetails component for viewing a single task
import TaskEdit from './components/TaskEdit';  // Import TaskEdit component for editing a task
import Login from './components/Login';  // Import Login component
import Register from './components/Register';  // Import Register component
import { AuthContext, AuthProvider } from './components/AuthContext';  // Import AuthContext and AuthProvider for authentication
import './App.css'; // Import custom styles and Tailwind CSS for styling

// Component for protecting routes that require authentication
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);  // Access user information from AuthContext
  return user ? children : <Navigate to="/login" />;  // If user is authenticated, render children; otherwise, redirect to login
};

const App = () => {
  return (
    <div className="App bg-gray-100 min-h-screen">  {/* Main application div with background color and minimum height */}
      <AuthProvider> {/* Wrap the application with the AuthProvider to provide authentication context */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />  {/* Route for Login component */}
          <Route path="/register" element={<Register />} />  {/* Route for Register component */}
          
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute> {/* Protect the TaskList route */}
                <TaskList />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/new"
            element={
              <PrivateRoute> {/* Protect the TaskForm route */}
                <TaskForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <PrivateRoute> {/* Protect the TaskDetails route */}
                <TaskDetails />
              </PrivateRoute>
            }
          />
          <Route 
            path="/tasks/:id/edit" 
            element={
              <PrivateRoute> {/* Protect the TaskEdit route */}
                <TaskEdit />
              </PrivateRoute>
            } 
          /> 
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;  // Export the App component as default
