import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';
import {
    createPaymentIntent,
    confirmPayment,
    getPaymentHistory,
} from '../controllers/payment.controller.js';

const router = express.Router();

router.use(protect);

router.post(
    '/create-intent',
    [
        body('sessionId').notEmpty().withMessage('Session ID is required'),
        body('amount').isNumeric().withMessage('Amount is required'),
    ],
    validate,
    createPaymentIntent
);

router.post(
    '/confirm',
    [
        body('sessionId').notEmpty().withMessage('Session ID is required'),
    ],
    validate,
    confirmPayment
);

router.get('/history', getPaymentHistory);

export default router;
