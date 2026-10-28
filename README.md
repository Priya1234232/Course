# Course Management System using MERN

## Requirements
Install Node.js and run MongoDB locally, or use MongoDB Atlas.

## Start backend
Open VS Code terminal:
```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```
Keep this terminal open. Default MongoDB URI is `mongodb://127.0.0.1:27017/course_management`.

## Start frontend
Open a SECOND terminal:
```powershell
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`.

## Features
Home, Courses, Add Course, Edit Course, Delete Course, search, About page, MongoDB persistence, React Router and Axios.

## API
GET `/api/courses`, GET `/api/courses/:id`, POST `/api/courses`, PUT `/api/courses/:id`, DELETE `/api/courses/:id`.

Educational demo only; authentication and authorization are not included.
