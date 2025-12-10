import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';

// Create Payment Intent (Mock for now)
export const createPaymentIntent = async (req, res, next) => {
    try {
        const { sessionId, amount, currency = 'INR' } = req.body;

        // Verify session exists
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            return next(new AppError('Session not found', 404));
        }

        // In a real app, you would call Stripe/Razorpay here
        // const paymentIntent = await stripe.paymentIntents.create({ ... });

        res.status(200).json({
            status: 'success',
            data: {
                clientSecret: 'mock_client_secret_12345', // Used by frontend to complete payment
                amount,
                currency,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Confirm Payment (Webhook handler or manual confirm for mock)
export const confirmPayment = async (req, res, next) => {
    try {
        const { sessionId, paymentId } = req.body;

        // Update session status
        const session = await prisma.session.update({
            where: { id: sessionId },
            data: {
                paymentStatus: 'PAID',
                status: 'CONFIRMED',
            },
            include: {
                mentor: { include: { user: true } },
                user: true,
            },
        });

        // Create Payment Record
        await prisma.payment.create({
            data: {
                sessionId,
                userId: req.user.id,
                mentorId: session.mentorId,
                amount: session.amount,
                platformFee: session.platformFee,
                currency: 'INR',
                status: 'COMPLETED',
                transactionId: paymentId || `tx_${Date.now()}`,
                paymentGateway: 'MOCK',
            },
        });

        res.status(200).json({
            status: 'success',
            data: { session },
        });
    } catch (error) {
        next(error);
    }
};

// Get Payment History
export const getPaymentHistory = async (req, res, next) => {
    try {
        const payments = await prisma.payment.findMany({
            where: { userId: req.user.id },
            include: {
                session: {
                    include: {
                        mentor: { include: { user: { select: { fullName: true } } } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json({
            status: 'success',
            results: payments.length,
            data: { payments },
        });
    } catch (error) {
        next(error);
    }
};
