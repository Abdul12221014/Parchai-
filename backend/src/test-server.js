import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Mock Data
const MOCK_MENTORS = [
    {
        id: 'mentor-1',
        user: {
            fullName: 'Sarah Johnson',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        bio: 'Experienced career coach with 10+ years in tech.',
        expertise: ['Career Growth', 'Leadership', 'Interview Prep'],
        hourlyRate: 1500,
        rating: 4.8,
        totalSessions: 120,
        isVerified: true,
    },
    {
        id: 'mentor-2',
        user: {
            fullName: 'David Chen',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        },
        bio: 'Startup founder and product strategy expert.',
        expertise: ['Startup', 'Product Management', 'Fundraising'],
        hourlyRate: 2000,
        rating: 4.9,
        totalSessions: 85,
        isVerified: true,
    },
    {
        id: 'mentor-3',
        user: {
            fullName: 'Priya Sharma',
            profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        },
        bio: 'Mental health advocate and life transition coach.',
        expertise: ['Mental Clarity', 'Life Transition', 'Stress Management'],
        hourlyRate: 1200,
        rating: 4.7,
        totalSessions: 200,
        isVerified: true,
    }
];

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Parchai Backend API is running',
        timestamp: new Date().toISOString(),
        version: '1.1.0',
    });
});

// Auth Endpoints (Mock)
app.post('/api/auth/register', (req, res) => {
    const { email, fullName } = req.body;
    res.status(201).json({
        status: 'success',
        data: {
            user: { id: 'mock-user-id', email, fullName, role: 'USER' },
            token: 'mock-jwt-token',
        },
    });
});

app.post('/api/auth/login', (req, res) => {
    res.json({
        status: 'success',
        data: {
            user: { id: 'mock-user-id', email: 'test@parchai.com', fullName: 'Test User', role: 'USER' },
            token: 'mock-jwt-token',
        },
    });
});

app.get('/api/auth/me', (req, res) => {
    res.json({
        status: 'success',
        data: {
            user: { id: 'mock-user-id', email: 'test@example.com', fullName: 'Test User', role: 'USER' },
        },
    });
});

// Mentor Endpoints (Mock)
app.get('/api/mentors', (req, res) => {
    const { search, expertise } = req.query;
    let results = [...MOCK_MENTORS];

    if (search) {
        const q = search.toLowerCase();
        results = results.filter(m =>
            m.user.fullName.toLowerCase().includes(q) ||
            m.bio.toLowerCase().includes(q)
        );
    }

    if (expertise) {
        results = results.filter(m => m.expertise.includes(expertise));
    }

    res.json({
        status: 'success',
        results: results.length,
        data: { mentors: results },
    });
});

app.get('/api/mentors/:id', (req, res) => {
    const mentor = MOCK_MENTORS.find(m => m.id === req.params.id);
    if (!mentor) {
        return res.status(404).json({ status: 'fail', message: 'Mentor not found' });
    }
    res.json({
        status: 'success',
        data: { mentor },
    });
});

app.get('/api/mentors/me/dashboard-stats', (req, res) => {
    res.json({
        status: 'success',
        data: {
            stats: {
                totalSessions: 45,
                completedSessions: 42,
                upcomingSessions: 3,
                totalEarnings: 63000,
                rating: 4.9,
                reviews: 38,
            },
        },
    });
});

app.put('/api/mentors/me', (req, res) => {
    res.json({
        status: 'success',
        data: {
            mentor: {
                ...MOCK_MENTORS[0],
                ...req.body,
            }
        }
    });
});

// Session Endpoints (Mock)
let MOCK_SESSIONS = [];

app.post('/api/sessions/book', (req, res) => {
    const { mentorId, scheduledAt, userNotes } = req.body;
    const newSession = {
        id: `session-${Date.now()}`,
        mentorId,
        userId: 'mock-user-id',
        scheduledAt,
        status: 'PENDING',
        userNotes,
        mentor: MOCK_MENTORS.find(m => m.id === mentorId),
    };
    MOCK_SESSIONS.push(newSession);

    res.status(201).json({
        status: 'success',
        data: { session: newSession },
    });
});

app.get('/api/sessions/my-sessions', (req, res) => {
    res.json({
        status: 'success',
        results: MOCK_SESSIONS.length,
        data: { sessions: MOCK_SESSIONS },
    });
});

app.get('/api/sessions/mentor-sessions', (req, res) => {
    // Return sessions where mentorId matches (mocking auth user as mentor-1)
    const mentorSessions = MOCK_SESSIONS.filter(s => s.mentorId === 'mentor-1');
    res.json({
        status: 'success',
        data: { sessions: mentorSessions },
    });
});

// Payment Endpoints (Mock)
app.post('/api/payments/create-intent', (req, res) => {
    res.json({
        status: 'success',
        data: {
            clientSecret: 'mock_secret_key',
            amount: req.body.amount,
        },
    });
});

app.post('/api/payments/confirm', (req, res) => {
    const { sessionId } = req.body;

    // Find and update session
    const sessionIndex = MOCK_SESSIONS.findIndex(s => s.id === sessionId);
    if (sessionIndex > -1) {
        MOCK_SESSIONS[sessionIndex].status = 'CONFIRMED';
        MOCK_SESSIONS[sessionIndex].paymentStatus = 'PAID';

        res.json({
            status: 'success',
            data: { session: MOCK_SESSIONS[sessionIndex] },
        });
    } else {
        res.status(404).json({ status: 'fail', message: 'Session not found' });
    }
});

// Start server
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('🔌 Client connected to Mock Socket:', socket.id);

    socket.on('join_room', (userId) => {
        socket.join(userId);
        console.log(`👤 User ${userId} joined room`);

        // Mock event: Send a welcome notification after 2 seconds
        setTimeout(() => {
            io.to(userId).emit('notification', {
                type: 'SUCCESS',
                message: 'Welcome to Parchai Real-time!',
                timestamp: new Date(),
            });
        }, 2000);
    });
});

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
    console.log('🚀 Parchai Backend Test Server (v5)');
    console.log(`📍 Running on: http://localhost:${PORT}`);
    console.log('⚠️  Running in MOCK mode with Socket.io');
});
