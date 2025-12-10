# Parchai Backend API

Backend API for the Parchai mentor marketplace platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Redis (optional, for caching)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your actual values

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development server
npm run dev
```

The API will be available at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── models/          # Business logic
│   ├── routes/          # API routes
│   ├── services/        # External services
│   ├── utils/           # Utility functions
│   └── server.js        # Entry point
├── prisma/
│   └── schema.prisma    # Database schema
└── tests/               # Test files
```

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/change-password` - Change password

### Users
- `GET /api/users/me` - Get profile
- `PUT /api/users/me` - Update profile
- `DELETE /api/users/me` - Delete account

### Mentors
- `GET /api/mentors` - List mentors
- `GET /api/mentors/:id` - Get mentor profile
- `POST /api/mentors/apply` - Apply to become mentor
- `PUT /api/mentors/me` - Update mentor profile

### Sessions
- `POST /api/sessions/book` - Book a session
- `GET /api/sessions` - Get user sessions
- `GET /api/sessions/:id` - Get session details

### Payments
- `POST /api/payments/create-intent` - Create payment
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Payment history

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/mentor/:mentorId` - Get mentor reviews

## 🗄️ Database

Using PostgreSQL with Prisma ORM.

### Migrations

```bash
# Create a new migration
npm run prisma:migrate

# View database in Prisma Studio
npm run prisma:studio
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🚢 Deployment

1. Set up production database
2. Set environment variables
3. Run migrations
4. Start server with `npm start`

## 📄 License

© 2025 Parchai - All rights reserved
