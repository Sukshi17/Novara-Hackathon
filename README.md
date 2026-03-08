# Student Management System

A full-stack web application to manage student records. Built with React (Vite), Node.js, Express, and MongoDB.

## Features
- Add new students with Name, Roll Number, and Department.
- View a list of all students.
- Search students by Name or Roll Number.
- filter students by Department.
- Delete student records.
- Premium, dynamic, and responsive UI.

## Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017

## Setup & Running Locally

1. **Navigate to the project directory**
   ```bash
   cd student-management-system
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   node server.js
   ```
   The backend will start on `http://localhost:5000` and connect to MongoDB `mongodb://127.0.0.1:27017/student-management`.

3. **Start the Frontend Application**
   Open a new terminal and run:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`. Open it in your browser.
