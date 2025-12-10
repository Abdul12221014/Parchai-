import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect, restrictTo } from '../middleware/auth.js';
import {
    updateMentorProfile,
    getAllMentors,
    getMentorById,
    updateAvailability,
    getMentorDashboardStats,
} from '../controllers/mentor.controller.js';

const router = express.Router();

// Validation rules
const profileValidation = [
    body('bio').trim().notEmpty().withMessage('Bio is required'),
    body('expertise').isArray().withMessage('Expertise must be an array'),
    body('hourlyRate').isNumeric().withMessage('Hourly rate must be a number'),
    body('languages').isArray().withMessage('Languages must be an array'),
];

const availabilityValidation = [
    body('slots').isArray().withMessage('Slots must be an array'),
    body('slots.*.dayOfWeek').isInt({ min: 0, max: 6 }).withMessage('Invalid day of week'),
    body('slots.*.startTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid start time format (HH:MM)'),
    body('slots.*.endTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid end time format (HH:MM)'),
];

// Public routes
router.get('/', getAllMentors);
router.get('/:id', getMentorById);

// Protected routes
router.use(protect);

router.get(
    '/me/dashboard-stats',
    restrictTo('MENTOR'),
    getMentorDashboardStats
);

router.put(
    '/me',
    profileValidation,
    validate,
    updateMentorProfile
);

router.put(
    '/me/availability',
    restrictTo('MENTOR'),
    availabilityValidation,
    validate,
    updateAvailability
);

export default router;
