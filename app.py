from flask import Flask, jsonify, request # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_cors import CORS # type: ignore
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity # type: ignore
import datetime
from flask_bcrypt import Bcrypt # type: ignore
import os
from flask import send_from_directory # type: ignore
from flask_admin import Admin # type: ignore
from flask_admin.contrib.sqla import ModelView # type: ignore

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS for the specified origins
CORS(app, origins=["https://task-manager-ve3-35qb.onrender.com"])

# Configuration settings for the application
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'  # Set up SQLite database
app.config['JWT_SECRET_KEY'] = 'VE3PROJECT'  # Secret key for JWT
db = SQLAlchemy(app)  # Initialize the SQLAlchemy ORM
bcrypt = Bcrypt(app)  # Initialize Bcrypt for password hashing
jwt = JWTManager(app)  # Initialize JWT manager for token handling

# Define the User model for the database
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Primary key
    username = db.Column(db.String(150), nullable=False)  # Username of the user
    password = db.Column(db.String(150), nullable=False)  # Hashed password

# Define the Task model for the database
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Primary key
    title = db.Column(db.String(120), nullable=False)  # Title of the task
    description = db.Column(db.String(500), nullable=False)  # Description of the task
    completed = db.Column(db.Boolean, default=False)  # Status of the task (completed or not)

# Create database tables
with app.app_context():
    db.create_all()
    
# Set up Flask Admin for managing User and Task models
admin = Admin(app, name='Task Manager Admin', template_mode='bootstrap3')
admin.add_view(ModelView(User, db.session))  # Admin view for User model
admin.add_view(ModelView(Task, db.session))  # Admin view for Task model

# Route to get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()  # Query to get all users
    return jsonify([{
        'id': user.id,
        'username': user.username,
        # You might not want to return the password in a real app
    } for user in users])

# Route for user registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()  # Get JSON data from request
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')  # Hash the password
    new_user = User(username=data['username'], password=hashed_password)  # Create new user
    db.session.add(new_user)  # Add user to the session
    db.session.commit()  # Commit the session
    return jsonify({"message": "User created successfully"}), 201  # Return success message

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Get JSON data from request
    user = User.query.filter_by(username=data['username']).first()  # Find user by username
    # Verify password and create access token
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'username': user.username}, expires_delta=datetime.timedelta(hours=1))
        return jsonify({'token': access_token}), 200  # Return the access token
    return jsonify({"message": "Invalid credentials"}), 401  # Return error message

# Route to get all tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()  # Query to get all tasks
    return jsonify([{
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'completed': task.completed
    } for task in tasks])  # Return tasks as JSON

# Route to get a specific task by ID
@app.route('/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = Task.query.get(id)  # Query to get task by ID
    if task:
        return jsonify({
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'completed': task.completed
        })  # Return task details
    return jsonify({'error': 'Task not found!'}), 404  # Return error if task not found

# Route to create a new task
@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json  # Get JSON data from request
    # Check for required fields
    if 'title' not in data or 'description' not in data:
        return jsonify({'error': 'Title and description are required!'}), 400
    
    new_task = Task(title=data['title'], description=data['description'])  # Create new task
    db.session.add(new_task)  # Add task to the session
    db.session.commit()  # Commit the session
    
    return jsonify({
        'message': 'Task created.',
        'task': {
            'id': new_task.id,
            'title': new_task.title,
            'description': new_task.description,
            'completed': new_task.completed
        }
    }), 201  # Return success message and task details

# Route to update a specific task by ID
@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)  # Query to get task by ID
    if task:
        data = request.json  # Get JSON data from request
        # Check for required fields
        if 'title' not in data or 'description' not in data or 'completed' not in data:
            return jsonify({'error': 'Title, description, and completed status are required!'}), 400
        
        # Update task details
        task.title = data['title']
        task.description = data['description']
        task.completed = data['completed']
        
        db.session.commit()  # Commit the session
        return jsonify({'message': 'Task updated!'})  # Return success message
    return jsonify({'error': 'Task not found!'}), 404  # Return error if task not found
    
# Route to delete a specific task by ID
@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)  # Query to get task by ID
    if task:
        db.session.delete(task)  # Delete task from the session
        db.session.commit()  # Commit the session
        return jsonify({'message': 'Task deleted.'})  # Return success message
    return jsonify({'error': 'Task not found!'}), 404  # Return error if task not found

# Run the Flask application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
