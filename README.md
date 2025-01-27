
# URL Shortener

A full-stack URL Shortener application built with a **Node.js Express backend** and a **React frontend**, using **MongoDB** as the database and **Redis** for caching and rate-limiting. This project supports Docker for easy deployment and environment setup.

---

## **Features**
- Shorten long URLs with rate-limiting to prevent abuse.
- User authentication (register, login) with JWT-based authorization.
- Dashboard to manage and view your shortened URLs.
- RESTful API for backend services.
- Dockerized setup for quick local development and deployment.

---

## **Directory Structure**
```
.
├── backend                # Backend API (Node.js/Express)
│   ├── src
│   │   ├── config         # Configuration files (database, rate limiter)
│   │   ├── controllers    # API route controllers
│   │   ├── middleware     # Custom middleware (auth, etc.)
│   │   ├── models         # Mongoose models (User, URL)
│   │   ├── routes         # API routes
│   │   ├── utils          # Utility functions (logging, validation)
│   └── tsconfig.json      # TypeScript configuration
├── docker-compose.yml     # Docker Compose configuration
├── frontend               # Frontend application (React)
│   ├── src
│   │   ├── components     # Reusable components (forms, auth)
│   │   ├── pages          # Application pages (dashboard, home, etc.)
│   │   ├── services       # API services for backend communication
│   │   ├── utils          # Utility functions (e.g., token management)
│   └── tsconfig.json      # TypeScript configuration
```

---

## **Setup Instructions**

### **1. Prerequisites**
- Docker and Docker Compose installed on your system.
- Node.js and npm (optional, if running services locally without Docker).

### **2. Clone the Repository**
```bash
git clone https://github.com/au-syntaxwhiz/url-shortner.git
cd url-shortener
```

### **3. Environment Configuration**
- The project uses environment variables to manage configuration. Copy the provided `.env.example` files in both `backend` and `frontend` and fill in the required values.

#### Backend `.env`
```env
MONGO_URI=mongodb://mongo:27017/url-shortener
REDIS_URL=redis://redis:6379
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=50
RATE_LIMIT_MESSAGE="Too many URL shortening requests, please try again later"
BASE_URL=http://localhost:8000
JWT_SECRET="your-secret-key"
PORT=8000
```

#### Frontend `.env`
```env
REACT_APP_BASE_URL=http://localhost:8000
```

### **4. Run with Docker**
```bash
docker-compose up --build
```

- Access the frontend at `http://localhost:3000`.
- The backend API is available at `http://localhost:8000`.

### **5. Run Locally (Without Docker)**

#### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```

#### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

---

## **API Endpoints**

### **Authentication**
- **POST** `/auth/register` - Register a new user.
- **POST** `/auth/login` - Log in and retrieve a JWT token.

### **URL Management**
- **POST** `/urls/shorten` - Shorten a URL (rate-limited).
- **GET** `/urls` - Retrieve all URLs for an authenticated user.

---

## **Tech Stack**
### Backend
- Node.js, Express.js, TypeScript
- MongoDB with Mongoose
- Redis for caching and rate-limiting
- JWT for authentication

### Frontend
- React, TypeScript
- Axios for API calls
- Tailwind CSS (optional, if used for styling)

### DevOps
- Docker and Docker Compose for containerization

---
