import { AppError } from './errorHandler.js';
import { verifyToken } from '../utils/jwt.js';
import prisma from '../config/database.js';

// Protect routes - require authentication
export const protect = async (req, res, next) => {
    try {
        // Get token from header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(new AppError('You are not logged in. Please log in to access this resource.', 401));
        }

        // Verify token
        const decoded = verifyToken(token);

        // Check if user still exists
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                isActive: true,
            },
        });

        if (!user) {
            return next(new AppError('The user belonging to this token no longer exists.', 401));
        }

        if (!user.isActive) {
            return next(new AppError('Your account has been deactivated. Please contact support.', 401));
        }

        // Grant access to protected route
        req.user = user;
        next();
    } catch (error) {
        return next(new AppError('Invalid token. Please log in again.', 401));
    }
};

// Restrict to specific roles
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action.', 403)
            );
        }
        next();
    };
};

// Optional authentication (doesn't fail if no token)
export const optionalAuth = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

            const decoded = verifyToken(token);
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    role: true,
                },
            });

            if (user) {
                req.user = user;
            }
        }
        next();
    } catch (error) {
        // Continue without user
        next();
    }
};
