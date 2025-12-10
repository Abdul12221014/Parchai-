import prisma from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';

// Get Mentor Dashboard Stats
export const getMentorDashboardStats = async (req, res, next) => {
    try {
        const mentor = await prisma.mentor.findUnique({
            where: { userId: req.user.id },
        });

        if (!mentor) {
            return next(new AppError('Mentor profile not found', 404));
        }

        // Get stats
        const [totalSessions, completedSessions, upcomingSessions] = await Promise.all([
            prisma.session.count({ where: { mentorId: mentor.id } }),
            prisma.session.count({ where: { mentorId: mentor.id, status: 'COMPLETED' } }),
            prisma.session.count({ where: { mentorId: mentor.id, status: 'CONFIRMED', scheduledAt: { gte: new Date() } } }),
        ]);

        // Calculate earnings (mock calculation based on completed sessions)
        // In real app, query Payment table
        const earnings = await prisma.payment.aggregate({
            where: { mentorId: mentor.id, status: 'COMPLETED' },
            _sum: { amount: true },
        });

        res.status(200).json({
            status: 'success',
            data: {
                stats: {
                    totalSessions,
                    completedSessions,
                    upcomingSessions,
                    totalEarnings: earnings._sum.amount || 0,
                    rating: mentor.rating,
                    reviews: mentor.totalReviews,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

// Create or update mentor profile
export const updateMentorProfile = async (req, res, next) => {
    try {
        const {
            bio,
            expertise,
            hourlyRate,
            currency,
            videoIntroUrl,
            languages,
            yearsExperience,
        } = req.body;

        // Check if user is already a mentor
        const existingMentor = await prisma.mentor.findUnique({
            where: { userId: req.user.id },
        });

        let mentor;

        if (existingMentor) {
            // Update existing
            mentor = await prisma.mentor.update({
                where: { userId: req.user.id },
                data: {
                    bio,
                    expertise,
                    hourlyRate,
                    currency,
                    videoIntroUrl,
                    languages,
                    yearsExperience,
                },
            });
        } else {
            // Create new
            mentor = await prisma.mentor.create({
                data: {
                    userId: req.user.id,
                    bio,
                    expertise,
                    hourlyRate,
                    currency,
                    videoIntroUrl,
                    languages,
                    yearsExperience,
                },
            });

            // Update user role to MENTOR
            await prisma.user.update({
                where: { id: req.user.id },
                data: { role: 'MENTOR' },
            });
        }

        res.status(200).json({
            status: 'success',
            data: { mentor },
        });
    } catch (error) {
        next(error);
    }
};

// Get all mentors with filters
export const getAllMentors = async (req, res, next) => {
    try {
        const {
            search,
            expertise,
            minPrice,
            maxPrice,
            rating,
            language,
            page = 1,
            limit = 10,
        } = req.query;

        const skip = (page - 1) * limit;

        // Build filter object
        const where = {
            isVerified: true, // Only show verified mentors
            isAvailable: true,
        };

        if (search) {
            where.OR = [
                { bio: { contains: search } },
                { user: { fullName: { contains: search } } },
            ];
        }

        if (expertise) {
            where.expertise = { has: expertise };
        }

        if (minPrice || maxPrice) {
            where.hourlyRate = {};
            if (minPrice) where.hourlyRate.gte = parseFloat(minPrice);
            if (maxPrice) where.hourlyRate.lte = parseFloat(maxPrice);
        }

        if (rating) {
            where.rating = { gte: parseFloat(rating) };
        }

        if (language) {
            where.languages = { has: language };
        }

        // Execute query
        const [mentors, total] = await Promise.all([
            prisma.mentor.findMany({
                where,
                include: {
                    user: {
                        select: {
                            fullName: true,
                            profileImage: true,
                        },
                    },
                },
                skip,
                take: parseInt(limit),
                orderBy: { rating: 'desc' },
            }),
            prisma.mentor.count({ where }),
        ]);

        res.status(200).json({
            status: 'success',
            results: mentors.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            data: { mentors },
        });
    } catch (error) {
        next(error);
    }
};

// Get mentor by ID
export const getMentorById = async (req, res, next) => {
    try {
        const mentor = await prisma.mentor.findUnique({
            where: { id: req.params.id },
            include: {
                user: {
                    select: {
                        fullName: true,
                        profileImage: true,
                    },
                },
                reviews: {
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: {
                            select: { fullName: true, profileImage: true },
                        },
                    },
                },
                availabilitySlots: true,
            },
        });

        if (!mentor) {
            return next(new AppError('Mentor not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: { mentor },
        });
    } catch (error) {
        next(error);
    }
};

// Update availability
export const updateAvailability = async (req, res, next) => {
    try {
        const { slots } = req.body; // Array of { dayOfWeek, startTime, endTime }

        // Get mentor ID
        const mentor = await prisma.mentor.findUnique({
            where: { userId: req.user.id },
        });

        if (!mentor) {
            return next(new AppError('Mentor profile not found', 404));
        }

        // Delete existing slots
        await prisma.mentorAvailability.deleteMany({
            where: { mentorId: mentor.id },
        });

        // Create new slots
        if (slots && slots.length > 0) {
            await prisma.mentorAvailability.createMany({
                data: slots.map(slot => ({
                    mentorId: mentor.id,
                    dayOfWeek: slot.dayOfWeek,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                })),
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Availability updated successfully',
        });
    } catch (error) {
        next(error);
    }
};
