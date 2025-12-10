import { Server } from 'socket.io';

let io;

export const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        // Join user to their specific room (e.g., user_123)
        socket.on('join_room', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined room ${userId}`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

// Helper to send notification to specific user
export const sendNotification = (userId, type, message, data = {}) => {
    if (io) {
        io.to(userId).emit('notification', {
            type,
            message,
            data,
            timestamp: new Date(),
        });
    }
};
