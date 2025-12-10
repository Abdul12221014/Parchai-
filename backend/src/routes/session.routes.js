import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect, restrictTo } from '../middleware/auth.js';
import {
    createSession,
    getUserSessions,
    getMentorSessions,
    getSessionById,
} from '../controllers/session.controller.js';

const router = express.Router();

router.use(protect);

// Validation rules
const bookingValidation = [
    body('mentorId').notEmpty().withMessage('Mentor ID is required'),
    body('scheduledAt').isISO8601().withMessage('Valid scheduled date is required'),
    body('durationMinutes').optional().isInt({ min: 15 }).withMessage('Duration must be at least 15 minutes'),
];

router.post('/book', bookingValidation, validate, createSession);
router.get('/my-sessions', getUserSessions);
router.get('/mentor-sessions', restrictTo('MENTOR'), getMentorSessions);
router.get('/:id', getSessionById);

export default router;
