<div align="center">

<img src="./assets/ojas-logo.png" width="60" alt="OJAS Logo" />

# Team OJAS — Official Website (Backend)

**Departmental Club of Electrical Engineering · NIT Hamirpur**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-team--ojas--nith.vercel.app-00d4ff?style=for-the-badge&logo=vercel)](https://team-ojas-nith.vercel.app/)
[![Backend Repo](https://img.shields.io/badge/Backend-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/anujkeshri7/Team-OJAS-backend)
[![Frontend Repo](https://img.shields.io/badge/Frontend-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/anujkeshri7/Team-OJAS-frontend)
[![Uptime Robot](https://img.shields.io/badge/Monitor-UptimeRobot-4CAF50?style=for-the-badge&logo=uptimerobot)](https://uptimerobot.com/)

</div>

---

## ⚡ Overview

This is the **REST API backend** powering the [Team OJAS website](https://team-ojas-nith.vercel.app/) — the official platform of the Electrical Engineering departmental club at **NIT Hamirpur**. Built with **Node.js**, **Express.js**, and **MongoDB**, it handles member registration, project management, image uploads via Cloudinary, and role-based authentication (Admin / Super Admin).

| | |
|---|---|
| 🌐 **Live Site** | [team-ojas-nith.vercel.app](https://team-ojas-nith.vercel.app/) |
| 🖥️ **Frontend Repo** | [Team-OJAS-frontend](https://github.com/anujkeshri7/Team-OJAS-frontend) |
| 🔧 **Runtime** | Node.js + Express.js |
| 🗄️ **Database** | MongoDB (Mongoose) |
| 🖼️ **Image Storage** | Cloudinary |
| 🚀 **Deployed on** | Render · UptimeRobot (monitor) |

---

## 📁 Project Structure

```
Team-OJAS-backend/
├── config/             # DB connection & Cloudinary config
├── controllers/        # Route handler logic
├── middleware/         # Auth, role guards, Multer upload
├── models/             # Mongoose schemas (User, Member, Project)
├── routes/             # Express route definitions
├── .env                # Environment variables (not committed)
├── index.js            # Entry point — server bootstrap
└── services.js         # Shared utility/service functions
```

---

---

## 📖 Detailed Documentation

### 1. Tech Stack

| Package | Purpose |
|---|---|
| **express** | HTTP server & routing |
| **mongoose** | MongoDB ODM |
| **cloudinary** | Cloud image storage |
| **multer** | Multipart file upload handling |
| **jsonwebtoken** | JWT-based auth tokens |
| **bcrypt** | Password hashing |
| **cookie-parser** | Parse cookies for token storage |
| **cors** | Cross-origin request handling |
| **dotenv** | Environment variable management |

---

### 2. Database Models

#### 👤 Member
Stores profile data for each club member displayed on the `/members` page.

```
name · position · bio · profileImage (Cloudinary URL)
instagram · linkedin · github
```

Members are grouped into sections on the frontend by their `position` field:
1. Faculty Incharge → 2. Final Year → 3. Club Coordinators → 4. Coordinators → 5. Executives → 6. Volunteers

#### 🗂️ Project
Stores all details of club projects shown on the Projects page.

```
title* · domain* · image* · shortDescription
problemStatement · objectives · solution · architecture
hardware · software · algorithms · implementation
results · challenges · applications · futureScope
tech · githubLink · demoLink
```
*\* Required fields — all others are optional.*

#### 🔐 User
Stores credentials and role for authenticated users (Admin / Super Admin).

```
email · password (hashed) · role
```

---

### 3. API Routes

#### 🟢 Member Routes (`/api/members`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Fetch all members |
| `POST` | `/add` | Open (temporary) | Self-register as a member (via `/add-member` form) |
| `DELETE` | `/:id` | Admin | Remove a member |

#### 🟡 Project Routes (`/api/projects`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Fetch all projects |
| `GET` | `/:id` | Public | Fetch single project details |
| `POST` | `/add` | Admin | Add a new project |
| `PUT` | `/:id` | Admin | Edit an existing project |
| `DELETE` | `/:id` | Admin | Delete a project |

#### 🔴 Auth Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/login` | Public | Login and receive JWT cookie |
| `POST` | `/logout` | Authenticated | Clear auth cookie |
| `GET` | `/me` | Authenticated | Get current logged-in user |

#### 🔵 Admin Routes (`/api/admin`)

| Access | Description |
|---|---|---|---|
| Super Admin | List all users with roles |
| Super Admin | Grant admin access to a user |
| Super Admin | Revoke admin access from a user |

---

### 4. Authentication & Authorization

- Login issues a **JWT token stored in an HTTP-only cookie** for security.
- Every protected route passes through auth middleware that verifies the token.
- Two role levels:
  - **Admin** — Can add/edit projects and remove members.
  - **Super Admin** — All admin abilities + can promote/demote other users to Admin.

---

### 5. Image Uploads (Cloudinary + Multer)

Images (member profile photos & project images) are:
1. Received by the server via **Multer** as `multipart/form-data`
2. Streamed directly to **Cloudinary**
3. The returned Cloudinary URL is saved in MongoDB

This means no images are stored on the server itself.

---

### 6. Deployment & Monitoring

| Service | Role |
|---|---|
| **Render** | Backend server hosting with auto-deploy on push to `main` |
| **UptimeRobot** | Pings the server at regular intervals to prevent Render's free tier from spinning down, ensuring the frontend never hits a cold-start delay |

---

### 7. Environment Variables

Create a `.env` file in the root of the project:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/team-ojas
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=https://team-ojas-nith.vercel.app
```

---

### 8. Getting Started (Local Setup)

```bash
# 1. Clone the repo
git clone https://github.com/anujkeshri7/Team-OJAS-backend.git
cd Team-OJAS-backend

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env
# → Fill in MONGO_URI, JWT_SECRET, Cloudinary credentials

# 4. Start development server
node index.js
# or with nodemon:
npx nodemon index.js
```

The server will start on `http://localhost:5000` by default.

---

### 9. Connected Frontend

This backend is consumed exclusively by the **Team OJAS Frontend**:

- 🔗 **Frontend Repo:** [github.com/anujkeshri7/Team-OJAS-frontend](https://github.com/anujkeshri7/Team-OJAS-frontend)
- 🌐 **Live Site:** [team-ojas-nith.vercel.app](https://team-ojas-nith.vercel.app/)

---

## 🤝 Contributing

This is an internal club project. For changes, open a PR and tag a coordinator for review.

---

<div align="center">

© 2024 · Departmental Club of Electrical Engineering · NIT Hamirpur

*Built by students, powered by passion.*

</div>
