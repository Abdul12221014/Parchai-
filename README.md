# Parchai 🌑

<div align="center">

**You don't need advice. You need clarity.**

A premium full-stack platform for 1-on-1 mentorship and clarity sessions.

[Live Demo](#) • [Request Feature](https://github.com/Abdul12221014/Parchai-/issues) • [Report Bug](https://github.com/Abdul12221014/Parchai-/issues)

</div>

---

## 🌟 Overview

**Parchai** is a comprehensive mentorship platform connecting users with experts for personalized guidance. Unlike simple booking sites, Parchai offers a complete ecosystem including real-time chat, secure payments, and interactive dashboards for both mentors and mentees.

Built with a modern **MERN-like stack (SQL/NoSQL hybrid)**, it leverages the power of **React**, **Node.js**, **Prisma**, and **MongoDB** to deliver a fast, secure, and scalable experience.

## ✨ Key Features

### 🔐 Authentication & Security
- **Secure Auth System**: JWT-based authentication with HTTP-only cookies.
- **Role-Based Access**: Distinct portals for **Users** and **Mentors**.
- **Profile Management**: Secure profile updates and password management.

### 💬 Real-Time Interaction
- **Live Chat**: Socket.io powered messaging between mentors and mentees.
- **Instant Notifications**: Real-time alerts for booking updates and messages.

### 📅 Booking & Payments
- **Smart Scheduling**: Mentors can set availability; users can book slots seamlessly.
- **Secure Payments**: Integrated with **Stripe** and **Razorpay** for global transaction support.
- **Session Management**: Track upcoming, completed, and cancelled sessions.

### 🎨 Premium UI/UX
- **Dark Mode First**: A stunning, consistent dark theme with glassmorphism effects.
- **Responsive Design**: Flawless experience across Mobile, Tablet, and Desktop.
- **Interactive Elements**: Smooth animations and intuitive navigation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Vanilla CSS (Variables, Flexbox/Grid)
- **State Management**: Zustand
- **Routing**: React Router v6
- **Real-time**: Socket.io Client

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB (Replica Set enabled for Transactions)
- **ORM**: Prisma
- **Caching**: Redis (Optional, for session store)
- **Real-time**: Socket.io Server

### DevOps
- **Containerization**: Docker & Docker Compose
- **Version Control**: Git & GitHub

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js** (v16+)
- **Docker** (for MongoDB & Redis)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Abdul12221014/Parchai-.git
cd Parchai-
```

### 2. Infrastructure Setup (Docker)
Start the MongoDB replica set and Redis containers.
```bash
docker-compose up -d
```

### 3. Backend Setup
Navigate to the backend directory and install dependencies.
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5001
DATABASE_URL="mongodb://localhost:27018/parchai?replicaSet=rs0"
JWT_SECRET="your_super_secret_key"
FRONTEND_URL="http://localhost:5173"
NODE_ENV="development"
```

Initialize the database:
```bash
# Generate Prisma Client
npx prisma generate

# Seed the database with initial mentors and users
node prisma/seed.js
```

Start the Backend Server:
```bash
npm run dev
```

### 4. Frontend Setup
Open a new terminal, navigate to the root directory (or `src` parent).
```bash
# Install frontend dependencies
npm install

# Start Frontend Server
npm run dev
```

Visit `http://localhost:5173` to view the app!

---

## 📁 Project Structure

```
Parchai/
├── backend/                 # Node.js/Express Backend
│   ├── prisma/              # Database Schema & Seed
│   ├── src/
│   │   ├── controllers/     # Route Logic
│   │   ├── middleware/      # Auth & Error Handling
│   │   ├── routes/          # API Routes
│   │   └── utils/           # Helper functions
├── src/                     # React Frontend
│   ├── components/          # Reusable Components
│   ├── pages/               # Application Pages (Dashboard, Home, etc.)
│   ├── services/            # API Service Layer (Axios)
│   ├── store/               # Zustand Global Store
│   ├── styles/              # Global CSS & Design Tokens
│   └── ui/                  # UI Primitives (Buttons, Toasts)
├── docker-compose.yml       # DB Infrastructure
└── README.md                # Project Documentation
```

---

## 📸 Screenshots

### Enhanced Homepage
![Homepage](https://raw.githubusercontent.com/Abdul12221014/Parchai-/main/docs/homepage_enhanced.png)

### User Dashboard
![Dashboard](https://raw.githubusercontent.com/Abdul12221014/Parchai-/main/docs/dashboard.png)

### Mentor Profile
![Mentor Profile](https://raw.githubusercontent.com/Abdul12221014/Parchai-/main/docs/profile.png)

---

## 🤝 Contributing

Contributions are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Abdul Kadir**
- GitHub: [@Abdul12221014](https://github.com/Abdul12221014)

---
<div align="center">
Built with clarity 🌑
</div>
