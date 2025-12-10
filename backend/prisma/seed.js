import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Create a sample mentor user
    const hashedPassword = await bcrypt.hash('password123', 10);

    const mentorUser = await prisma.user.upsert({
        where: { email: 'mentor@parchai.com' },
        update: {},
        create: {
            email: 'mentor@parchai.com',
            passwordHash: hashedPassword,
            fullName: 'Dr. Sarah Khan',
            role: 'MENTOR',
            profileImage: 'https://ui-avatars.com/api/?name=Sarah+Khan&background=random',
        },
    });

    // Create mentor profile
    const mentor = await prisma.mentor.upsert({
        where: { userId: mentorUser.id },
        update: {},
        create: {
            userId: mentorUser.id,
            bio: 'Experienced Clinical Psychologist with 10 years of practice in fast-paced enviroments. Specializing in anxiety and career stress.',
            expertise: ['Anxiety', 'Career Stress', 'Mindfulness'],
            hourlyRate: 1500.0,
            currency: 'INR',
            rating: 4.8,
            totalSessions: 120,
            totalReviews: 45,
            isVerified: true,
            isAvailable: true,
            languages: ['English', 'Hindi', 'Urdu'],
            yearsExperience: 10,
        },
    });

    // Create another sample mentor
    const mentorUser2 = await prisma.user.upsert({
        where: { email: 'ali@parchai.com' },
        update: {},
        create: {
            email: 'ali@parchai.com',
            passwordHash: hashedPassword,
            fullName: 'Ali Raza',
            role: 'MENTOR',
            profileImage: 'https://ui-avatars.com/api/?name=Ali+Raza&background=random',
        },
    });

    await prisma.mentor.upsert({
        where: { userId: mentorUser2.id },
        update: {},
        create: {
            userId: mentorUser2.id,
            bio: 'Life Coach and Career Counselor helping students find their path.',
            expertise: ['Career Counseling', 'Student Life', 'Motivation'],
            hourlyRate: 800.0,
            currency: 'INR',
            rating: 4.5,
            totalSessions: 50,
            totalReviews: 12,
            isVerified: true,
            isAvailable: true,
            languages: ['English', 'Urdu'],
            yearsExperience: 5,
        },
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
