# Medoswift

Medoswift is a full-stack web application designed for comprehensive healthcare management. It provides a seamless interface for users, doctors, pharmacies, and administrators to interact, schedule appointments, order medicines, and manage medical records.

## Tech Stack
- **Frontend**: React (with Vite)
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Real-Time capabilities**: Socket.io

## Repository Structure
- `/client` - Contains the React Vite frontend application.
- `/server` - Contains the Node.js Express backend application.

## Setup Instructions

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v18+)
- MongoDB (running locally or via MongoDB Atlas)

### 2. Environment Variables Required
You will need to set up `.env` files for both the client and server. Use the `.env.example` templates provided in both the `/client` and `/server` directories.

**Server Required Variables (`/server/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

**Client Required Variables (`/client/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Running Locally
**Terminal 1 (Backend):**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm install
npm run dev
```

## Deployment Steps

This repository is optimized for deployment using **Render** (for the backend & frontend) and **Cloudflare** (for domain management/CDN).

### 1. Backend on Render (Web Service)
- Connect your GitHub repository to Render.
- Create a new **Web Service**.
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node src/server.js`
- **Environment Variables**: Add your `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your frontend domain), etc.

### 2. Frontend on Render (Static Site)
- Create a new **Static Site** on Render.
- **Root Directory**: `client`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `client/dist`
- **Environment Variables**: Add `VITE_API_URL` pointing to your deployed backend URL.

### 3. Cloudflare Configuration
- Add your deployed frontend URL to Cloudflare.
- Configure DNS settings and SSL/TLS encryption mode to **Full (strict)**.
- Implement any necessary Page Rules or WAF rules for enhanced security.

---
*Note: This repository does not commit `node_modules/` or `.env` files to ensure strict security and smaller repository size.*
