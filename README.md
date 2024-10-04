Task Manager Application

Overview
This Task Manager Application is a web-based tool that allows users to manage their tasks efficiently. The application provides functionality to create, update, delete, and mark tasks as complete. It uses React for the frontend and Flask for the backend, making it a robust full-stack project.

Features:
Task Creation: Add new tasks with due dates and descriptions.
Task Completion: Mark tasks as completed or pending.
Edit Tasks: Modify task details, including titles and descriptions.
Delete Tasks: Remove tasks that are no longer required.
Persistent Data: Task data is stored and persists between sessions.
API Integration: Backend integration using REST API with Flask.

Technology Stack
Frontend:
React: A JavaScript library for building user interfaces.
HTML/CSS: Used for structure and styling of the application.

Backend:
Python Flask: A lightweight WSGI web application framework to build APIs.
Flask-CORS: To handle Cross-Origin Resource Sharing (CORS) requests.

Database:
POSTGRESQL/PGadmin: Used to store task data.

Installation
Prerequisites:
You can check requirement.txt for all the packages but below I have mentioned all neccessary packages.
Python (>= 3.7)
Node.js (>= 14.x)
npm (comes with Node.js)
Flask
React

Backend Setup (Flask):
Clone the repository.
    cmd/terminal VSCode:
      git clone <repository-link>
      cd task-manager-backend
      
Install the required Python packages.
    cmd/terminal VSCode:
      pip install -r requirements.txt
Start the Flask server.
    cmd/terminal VSCode:
      python app.py
The server should be running on http://localhost:5000.

Frontend Setup (React):
Navigate to the frontend directory.
    cmd/terminal VSCode:
      cd task-manager-frontend
Install the required Node packages.
    cmd/terminal VSCode:
      npm install
Start the React development server.
    cmd/terminal VSCode:
      npm start
The frontend should be running on http://localhost:3000.

For runing this code on your local machine (Computer/Laptop) make sure to cahnge the url with the localhost server in app.py,app.js,and in ./src/componenets files. You can check the servers mention above for localhost. Also you need to change database for local hosting (SQLALCHEMY_DATABASE_URI) you need to use SQLLite the command for sqllite is "sqlite:///tasks.db".

Note: It is compalsory to register before using the webapplication.

Render URL:
https://task-manager-ve3-35qb.onrender.com

