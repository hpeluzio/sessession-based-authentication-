# NestJS + Vite Session-Based Authentication

A full-stack web application with a **NestJS** backend API and **Vite React** frontend, implementing secure session-based authentication using HTTP-only cookies. It supports access tokens and refresh tokens for robust and seamless user authentication.

---

## Features

- NestJS backend API with JWT authentication  
- Access token + refresh token flow  
- Refresh token stored in HTTP-only, secure cookies  
- React frontend created with Vite  
- Axios + React Query for data fetching and mutation  
- Redux Toolkit for state management  
- Automatic token refresh on expiration via interceptors  
- Logout support and session invalidation  

---

## Backend (NestJS)

- `/auth/login` — Login with email and password, returns access token and sets refresh token cookie  
- `/auth/refresh` — Refresh access token using refresh token cookie  
- `/auth/logout` — Clears refresh token cookie and invalidates session  
- Protected routes using `JwtAuthGuard` and `JwtRefreshGuard`  
- Secure cookie configuration (HttpOnly, SameSite, Secure)  
- Token expiration times configurable via `.env`  

---

## Frontend (Vite + React)

- Login form with email and password  
- Redux slice for authentication state management  
- Axios instance with interceptors to handle token refresh automatically  
- React Query for managing server state and mutations  
- Logout button to clear session and state  
- Protected UI routes (optional to implement)  

---

## Setup

### Backend

1. Copy `.env.example` to `.env` and configure secrets and database  
2. Install dependencies and run:  
   ```bash
   yarn install
   yarn start:dev
