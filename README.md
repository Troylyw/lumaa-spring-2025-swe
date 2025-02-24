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
Modern UI design
Setup Instructions
1. Clone the Forked Repository
2. Setup the Backend
Navigate to the backend folder:cd backend
nstall dependencies:npm install
Configure environment variables Create a .env file in the backend/ directory:
PORT=5000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=taskdb
Run database migrations: npx typeorm migration:run -d dist/ormconfig.js
Start the backend server: npm run dev
The backend should now be running at http://localhost:5000.

3. Setup the Frontend
Navigate to the frontend folder: cd ../frontend
Install dependencies: npm install
Configure environment variables Create a .env file in the frontend/ directory: VITE_API_URL=http://localhost:5000
Start the frontend server: npm run dev
The frontend should now be running at http://localhost:5173.

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
Open http://localhost:5173/register
Enter a username and password, then click Register
After successful registration, navigate to the login page
2. Login
Open http://localhost:5173
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
This is a link to the demo video: https://drive.google.com/file/d/1Kp5G8WwM2VQY4dpHuVeXyPnmXqvvJfpe/view?usp=sharing

Notes
Ensure PostgreSQL is running locally and the credentials in .env are correct
If npx typeorm migration:run fails, ensure the dist/migrations/ folder exists
Use Postman or cURL to manually test API endpoints
If any error occurs, check server logs (backend) or browser console (frontend)
Salary Expectations per month
800 - 1500

This Task Management Application is now ready. If you face any issues, feel free to open an issue in the forked repository.
