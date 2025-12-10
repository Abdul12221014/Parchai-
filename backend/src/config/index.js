import dotenv from 'dotenv';
dotenv.config();

export default {
    // Server
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',

    // Database
    databaseUrl: process.env.DATABASE_URL,

    // JWT
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    },

    // Redis
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',

    // Email
    email: {
        sendgridApiKey: process.env.SENDGRID_API_KEY,
        fromEmail: process.env.FROM_EMAIL || 'noreply@parchai.com',
        fromName: process.env.FROM_NAME || 'Parchai',
    },

    // Stripe
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    },

    // Razorpay
    razorpay: {
        keyId: process.env.RAZORPAY_KEY_ID,
        keySecret: process.env.RAZORPAY_KEY_SECRET,
    },

    // Frontend
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

    // AWS
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION || 'us-east-1',
        s3Bucket: process.env.AWS_S3_BUCKET,
    },

    // Agora
    agora: {
        appId: process.env.AGORA_APP_ID,
        appCertificate: process.env.AGORA_APP_CERTIFICATE,
    },

    // Platform
    platformFeePercentage: parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 20,
    currency: process.env.CURRENCY || 'INR',
};
