# MERN Todo App

A simple full-stack task manager built with MongoDB, Express, React, and Node.js.

## Project Structure

```
mern-todo/
├── backend/          ← Node.js + Express + MongoDB
│   ├── models/
│   │   └── Todo.js   ← Mongoose schema
│   ├── routes/
│   │   └── todos.js  ← REST API routes
│   ├── server.js     ← Entry point
│   └── .env          ← Environment variables
└── frontend/         ← React + Vite
    └── src/
        ├── App.jsx   ← Main UI component
        ├── api.js    ← Fetch helpers
        └── index.css ← Global styles
```

## API Endpoints

| Method | Route            | Description          |
|--------|------------------|----------------------|
| GET    | /api/todos       | Get all todos        |
| POST   | /api/todos       | Create a todo        |
| PATCH  | /api/todos/:id   | Toggle completed     |
| DELETE | /api/todos/:id   | Delete a todo        |

## How to Run

### Prerequisites
- Node.js installed
- MongoDB running locally (`mongod`)

### 1. Start the Backend
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

Open http://localhost:5173 in your browser.
