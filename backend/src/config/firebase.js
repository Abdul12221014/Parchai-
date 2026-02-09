import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Initialize Firebase Admin
// We need service account credentials. 
// For production, these should be ENV variables.
// For dev, if no creds are present, it might fail or warn.

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Handle newlines in private key
    privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
};

if (!admin.apps.length) {
    try {
        if (serviceAccount.privateKey) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            console.log('Firebase Admin initialized with private key');
        } else {
            // Fallback for local dev if ADC is set up or just to not crash immediately
            // Ideally we shouldn't init if we can't verify, but let's allow it to start
            console.warn('Firebase Admin: No private key found. Google Auth verification will fail.');
            admin.initializeApp();
        }
    } catch (e) {
        console.error('Firebase Admin init failed:', e);
    }
}

export default admin;
