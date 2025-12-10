import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

// Register new user
export const register = async (req, res, next) => {
    try {
        const { email, password, fullName, phone } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return next(new AppError('Email already registered', 400));
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                fullName,
                phone,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                createdAt: true,
            },
        });

        // Generate tokens
        const token = generateToken(user.id, user.role);
        const refreshToken = generateRefreshToken(user.id);

        res.status(201).json({
            status: 'success',
            data: {
                user,
                token,
                refreshToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Login user
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email and password exist
        if (!email || !password) {
            return next(new AppError('Please provide email and password', 400));
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return next(new AppError('Invalid email or password', 401));
        }

        // Check if account is active
        if (!user.isActive) {
            return next(new AppError('Your account has been deactivated', 401));
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return next(new AppError('Invalid email or password', 401));
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
        });

        // Generate tokens
        const token = generateToken(user.id, user.role);
        const refreshToken = generateRefreshToken(user.id);

        // Remove password from output
        const { passwordHash, ...userWithoutPassword } = user;

        res.json({
            status: 'success',
            data: {
                user: userWithoutPassword,
                token,
                refreshToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Refresh access token
export const refreshAccessToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return next(new AppError('Refresh token is required', 400));
        }

        // Verify refresh token
        const decoded = verifyRefreshToken(refreshToken);

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                role: true,
                isActive: true,
            },
        });

        if (!user || !user.isActive) {
            return next(new AppError('Invalid refresh token', 401));
        }

        // Generate new access token
        const newToken = generateToken(user.id, user.role);

        res.json({
            status: 'success',
            data: {
                token: newToken,
            },
        });
    } catch (error) {
        return next(new AppError('Invalid or expired refresh token', 401));
    }
};

// Get current user
export const getMe = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                role: true,
                profileImage: true,
                emailVerified: true,
                createdAt: true,
                mentor: {
                    select: {
                        id: true,
                        bio: true,
                        expertise: true,
                        hourlyRate: true,
                        rating: true,
                        totalSessions: true,
                        isVerified: true,
                    },
                },
            },
        });

        res.json({
            status: 'success',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};

// Change password
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return next(new AppError('Please provide current and new password', 400));
        }

        // Get user with password
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
        });

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);

        if (!isPasswordValid) {
            return next(new AppError('Current password is incorrect', 401));
        }

        // Hash new password
        const newPasswordHash = await bcrypt.hash(newPassword, 12);

        // Update password
        await prisma.user.update({
            where: { id: req.user.id },
            data: { passwordHash: newPasswordHash },
        });

        res.json({
            status: 'success',
            message: 'Password changed successfully',
        });
    } catch (error) {
        next(error);
    }
};
