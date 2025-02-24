Task Management Application

This is a full-stack Task Management application built with:

Frontend: React + TypeScript

Backend: Node.js + Express + PostgreSQL + TypeORM

Authentication: JWT-based authentication

Features

User registration and login

JWT authentication for secure access

Task management: Create, Read, Update, Delete (CRUD)

User-specific tasks (Each user sees only their own tasks)

Logout functionality


Setup Instructions

1. Clone the Forked Repository
git clone with https://github.com/Troylyw/lumaa-spring-2025-swe.git

2. Setup the Backend

Navigate to the backend folder:cd backend
Install dependencies:npm install
Configure environment variables Create a .env file in the backend/ directory:
PORT=5001
JWT_SECRET=mn8IuAjBdIc7R4FtO4TpJrZU04TEsl01hZRrDZUyxiI=
DATABASE_URL=postgresql://yiweili@localhost:5432/taskmanager
Start the backend server: npm start
The backend should now be running at http://localhost:5001.

3. Setup the Frontend
Navigate to the frontend folder: cd ../frontend
Install dependencies: npm install
Configure environment variables Create a .env file in the frontend/ directory: REACT_APP_API_URL=http://localhost:5001
Start the frontend server: npm start
The frontend should now be running at http://localhost:3000.

4.Run database migrations: 
 1. Configure the PostgreSQL database connection in the ormconfig.json 
 2. Use the typeorm CLI to generate a migration file:
 npx typeorm migration:generate -n CreateUsersTable
 3. Use the following command to apply the migration to the database:
 npx typeorm migration:run



API Endpoints

Authentication
POST /auth/register – Create a new user
POST /auth/login – Login user, return a token (JWT)
Task Management
GET /tasks – Retrieve a list of tasks (optionally filtered by user).
POST /tasks – Create a new task.
PUT /tasks/:id – Update a task (e.g., mark as complete, edit text).
DELETE /tasks/:id – Delete a task.

Testing Instructions

1. Register a new user
Open http://localhost:3000/register
Enter a username and password, then click Register
After successful registration, navigate to the login page
2. Login
Open http://localhost:3000
Enter your username and password
Click Login
After successful login, you will be redirected to the Tasks page
3. Create a Task
Enter a task title in the input field
Click "Add"
The task should appear in the list
4. Update a Task
Click inside a task’s title field to edit it
Press Enter to save changes
Click the checkbox to mark the task as completed
5. Delete a Task
Click the "Delete" button next to a task
The task should be removed from the list
6. Logout
Click the "Logout" button in the tasks page
You should be redirected to the login page

Demo Video
https://drive.google.com/file/d/1I0Ijq6l5PVRWthnhkABerlWqhp_3Bdgq/view

Salary Expectations per hour
20-25/h
