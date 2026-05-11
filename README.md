# Feature Flag Management System

## Project Overview
This project is a backend-based Feature Flag Management System developed using Node.js, Express.js, and MySQL. The system allows Super Admins and Organization Admins to manage feature flags dynamically for different organizations.

The application supports authentication, organization management, feature creation, enabling/disabling features, and checking feature availability using REST APIs.

---

## Features

- Super Admin Login
- Organization Creation
- Admin Signup & Login
- JWT Authentication
- Password Encryption using bcrypt
- Create Feature Flags
- Enable / Disable Features
- Get All Features
- Check Feature Status
- MySQL Database Integration
- REST API Architecture

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcryptjs
- dotenv
- Postman

---

## Project Structure

backend/
│
├── config/
├── routes/
├── node_modules/
├── .env
├── package.json
├── package-lock.json
└── server.js

---

## API Endpoints

### Authentication APIs

POST /api/auth/superadmin/login

POST /api/auth/admin/signup

POST /api/auth/admin/login

---

### Organization APIs

POST /api/organizations/create

---

### Feature APIs

POST /api/features/create

GET /api/features/all

PUT /api/features/toggle/:id

GET /api/features/check/:organizationId/:featureKey

---

## Database

Database Name:

feature_flag_system

Tables Used:
- organizations
- users
- feature_flags

---

## Installation Steps

### 1. Clone Repository

git clone <repository-link>

---

### 2. Install Dependencies

npm install

---

### 3. Configure Environment Variables

Create a .env file inside backend folder:

PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=yourpassword

DB_NAME=feature_flag_system

JWT_SECRET=mysecretkey

---

### 4. Run Server

npm run dev

---

## Output

- Backend APIs successfully tested using Postman
- Feature flags dynamically managed using MySQL database

---

## Author

Sabeena Dharmaraj
