# 🧠 AI-Based Doubt Solver

A state-of-the-art, AI-powered platform designed to provide students with instant, accurate, and context-aware solutions to their academic queries. Built with a premium user experience and robust architecture.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20(Vite)-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![AI](https://img.shields.io/badge/AI-OpenRouter%20(Gemini)-orange)

---

## ✨ Features

- 💬 **Natural Language Processing**: Ask doubts in plain English and get human-like explanations.
- 🤖 **AI-Driven Logic**: Powered by Gemini 2.0 (via OpenRouter) for high-accuracy academic support.
- 📚 **Subject Context**: Optimized for Math, Science, Programming, and more.
- 🕒 **Persistent History**: Track and review your previous doubts with MongoDB integration.
- 🎨 **Premium UI/UX**: Modern dark-themed interface with glassmorphism, smooth Framer Motion animations, and responsive design.
- 🔍 **Real-time Search**: Quickly find past solutions from your history.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: For a blazing-fast development experience.
- **Tailwind CSS**: Modern utility-first styling.
- **Framer Motion**: Fluid micro-animations and transitions.
- **Lucide React**: Clean, consistent iconography.

### Backend
- **Node.js & Express**: High-performance RESTful API.
- **MongoDB Atlas**: Scalable cloud database for doubt persistence.
- **Mongoose**: Elegant object modeling for Node.js.

### AI Integration
- **OpenRouter API**: Accessing Gemini 2.0 Flash for efficient and intelligent responses.

---

## 🏗️ Project Structure

```text
/ai-doubt-solver/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main application views
│   │   ├── services/       # API communication logic
│   │   └── App.jsx         # Main routing and layout
│   └── .env                # Client environment variables
├── server/                 # Node.js backend (Express)
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic (AI integration)
│   │   └── server.js       # Entry point
│   └── .env                # Server environment variables (Secrets)
├── package.json            # Root scripts for project management
└── .gitignore              # Global git exclusions
```

---

## ⚙️ Quick Start

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- OpenRouter API Key

### 2. Installation

Clone the repository and install all dependencies (Root, Client, and Server) with one command:

```bash
# Install root tools
npm install

# Install both client and server dependencies
npm run install:all
```

### 3. Environment Setup

Create `.env` files in both `client` and `server` folders.

**Server (`server/.env`):**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_api_key
SITE_URL=http://localhost:3000
```

**Client (`client/.env`):**
```env
VITE_API_URL=http://localhost:5000/api/doubts
```

### 4. Running the Application

Start the development environment (both Frontend and Backend) using:

```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173) (or as shown in terminal)
- **Backend**: [http://localhost:5000](http://localhost:5000)

---

## 🛡️ Security & Optimization
- **Helmet**: Secured HTTP headers.
- **CORS**: Configured for safe cross-origin requests.
- **Dotenv**: Secure management of API keys and database credentials.

---

## 📜 License
This project is licensed under the MIT License.
