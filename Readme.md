# 🚀 Collaborative Task Manager

A **production-ready full-stack collaborative task management application** built with modern web technologies, real-time updates, secure authentication, and cloud deployment.

---

## 📌 Features

### ✅ Core Features
- User authentication with **secure HTTP-only cookies**
- Create, update, delete tasks (CRUD)
- Assign tasks to other users
- Role-based access control
- Filter & sort tasks by **status, priority, and due date**

### ⚡ Realtime
- **Socket.IO** powered real-time task updates
- Assigned users see updates instantly without page refresh

### 📧 Notifications
- Email notifications when a task is assigned  
  *(Nodemailer + SMTP)*

### 🛡️ Security
- JWT authentication stored in **HTTP-only cookies**
- Production-ready CORS configuration
- Environment-based secrets (no hardcoded credentials)

---

## 🧱 Tech Stack

### Frontend
- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **ShadcnUI**
- **React Query** (server-state & caching)
- **Socket.IO Client**
- **zod**
- **React-hook-form**

### Backend
- **Node.js + Express**
- **TypeScript**
- **Prisma ORM (v7)**
- **Socket.IO**
- **Nodemailer**
- **Zod** for validation

### Database
- **PostgreSQL (Neon – Serverless Postgres)**

### DevOps / Infrastructure
- **Docker** (frontend & backend)
- **Render** (cloud deployment)
- **GitHub Actions** (CI pipeline)

---

## 🏗️ Architecture Overview

```txt
client (React)
   |
   | HTTP + Cookies
   | WebSockets
   ↓
server (Express + Socket.IO)
   |
   | Prisma ORM
   ↓
PostgreSQL (Neon)

```

- Frontend deployed as a static site

- Backend runs as a Dockerized web service

- Database managed externally via Neon

- CI validates builds on every push & pull request


## 🔐 Authentication Flow
- User logs in
- Backend issues a JWT
- JWT stored in an HTTP-only cookie
- Cookie is sent automatically on every request
- Backend validates JWT via middleware
- ✔ No tokens stored in localStorage
- ✔ All protected routes enforced on the backend



## ⚡ Realtime Flow (Socket.IO)
- Client establishes a WebSocket connection
- Task CRUD actions emit socket events
- Other connected clients receive updates
- React Query cache is invalidated automatically
- ➡️ Result: Instant UI updates across users


## 📧 Email Notification Flow
- Task is assigned to a user
- Backend sends an email via SMTP
- Assignee receives notification with task details

## 🔄 CI Pipeline (GitHub Actions)
- Runs on every push and pull_request.
- CI Steps
- Install dependencies
- Generate Prisma Client
- Build backend & frontend
- Build Docker images
✅ Ensures build stability before deployment


## 🌍 Deployment
**Backend**
- Render Web Service
- Docker-based deployment
- Environment variables injected securely
- Connected to Neon PostgreSQL

**Frontend**
- Render Static Site
- Optimized Vite production build
- Environment-specific API base URL



## ⚙️ Environment Variables
**Backend**
```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
FRONTEND_URL=https://your-frontend.onrender.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```
**Frontend**
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api/v1
```

## 🧠  Project Demonstration
- Real-world full-stack architecture
- Secure authentication patterns
- Realtime systems using WebSockets
- ORM-based SQL database design
- Production deployment with Docker
- CI best practices
- Clean, scalable code structure

