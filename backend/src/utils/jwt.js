import jwt from 'jsonwebtoken';
import config from '../config/index.js';

// Generate access token
export const generateToken = (userId, role) => {
    return jwt.sign(
        { userId, role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
    );
};

// Generate refresh token
export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId },
        config.jwt.refreshSecret,
        { expiresIn: config.jwt.refreshExpiresIn }
    );
};

// Verify token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, config.jwt.refreshSecret);
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
};
