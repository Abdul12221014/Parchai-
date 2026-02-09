import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';
import {
    register,
    login,
    refreshAccessToken,
    getMe,
    register,
    login,
    googleLogin,
    refreshAccessToken,
    getMe,
    changePassword,
} from '../controllers/auth.controller.js';

const router = express.Router();

// Validation rules
const registerValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
];

const loginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
];

const changePasswordValidation = [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
];

// Routes
router.get('/test', (req, res) => res.json({ status: 'Auth route working' }));
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/google', googleLogin);
router.post('/refresh', refreshAccessToken);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePasswordValidation, validate, changePassword);

export default router;
