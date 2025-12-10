#!/usr/bin/env node

/**
 * Backend Validation Script
 * Validates the backend structure and configuration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Validating Parchai Backend Structure...\n');

let passed = 0;
let failed = 0;

function test(description, fn) {
    try {
        fn();
        console.log(`✅ ${description}`);
        passed++;
    } catch (error) {
        console.log(`❌ ${description}`);
        console.log(`   Error: ${error.message}`);
        failed++;
    }
}

// Test 1: Required files exist
test('All required files exist', () => {
    const requiredFiles = [
        'package.json',
        'prisma/schema.prisma',
        'src/server.js',
        'src/config/index.js',
        'src/config/database.js',
        'src/controllers/auth.controller.js',
        'src/middleware/auth.js',
        'src/middleware/errorHandler.js',
        'src/middleware/validate.js',
        'src/routes/auth.routes.js',
        'src/utils/jwt.js',
        '.env.example',
        'README.md',
    ];

    requiredFiles.forEach(file => {
        const filePath = path.join(__dirname, '..', file);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Missing file: ${file}`);
        }
    });
});

// Test 2: package.json is valid
test('package.json has required dependencies', () => {
    const packageJson = JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
    );

    const requiredDeps = [
        '@prisma/client',
        'express',
        'jsonwebtoken',
        'bcryptjs',
        'cors',
        'helmet',
        'dotenv',
    ];

    requiredDeps.forEach(dep => {
        if (!packageJson.dependencies[dep]) {
            throw new Error(`Missing dependency: ${dep}`);
        }
    });
});

// Test 3: Prisma schema has all models
test('Prisma schema has all required models', () => {
    const schemaContent = fs.readFileSync(
        path.join(__dirname, '..', 'prisma', 'schema.prisma'),
        'utf8'
    );

    const requiredModels = ['User', 'Mentor', 'Session', 'Payment', 'Review', 'MentorAvailability'];

    requiredModels.forEach(model => {
        if (!schemaContent.includes(`model ${model}`)) {
            throw new Error(`Missing model: ${model}`);
        }
    });
});

// Test 4: JWT utilities exist
test('JWT utilities are properly defined', () => {
    const jwtContent = fs.readFileSync(
        path.join(__dirname, '..', 'src', 'utils', 'jwt.js'),
        'utf8'
    );

    const requiredFunctions = [
        'generateToken',
        'generateRefreshToken',
        'verifyToken',
        'verifyRefreshToken',
    ];

    requiredFunctions.forEach(fn => {
        if (!jwtContent.includes(fn)) {
            throw new Error(`Missing function: ${fn}`);
        }
    });
});

// Test 5: Auth controller has all methods
test('Auth controller has all required methods', () => {
    const authContent = fs.readFileSync(
        path.join(__dirname, '..', 'src', 'controllers', 'auth.controller.js'),
        'utf8'
    );

    const requiredMethods = ['register', 'login', 'refreshAccessToken', 'getMe', 'changePassword'];

    requiredMethods.forEach(method => {
        if (!authContent.includes(`export const ${method}`)) {
            throw new Error(`Missing method: ${method}`);
        }
    });
});

// Test 6: Auth routes are defined
test('Auth routes are properly defined', () => {
    const routesContent = fs.readFileSync(
        path.join(__dirname, '..', 'src', 'routes', 'auth.routes.js'),
        'utf8'
    );

    const requiredRoutes = ['/register', '/login', '/refresh', '/me', '/change-password'];

    requiredRoutes.forEach(route => {
        if (!routesContent.includes(route)) {
            throw new Error(`Missing route: ${route}`);
        }
    });
});

// Test 7: Middleware exists
test('Authentication middleware is defined', () => {
    const authMiddleware = fs.readFileSync(
        path.join(__dirname, '..', 'src', 'middleware', 'auth.js'),
        'utf8'
    );

    const requiredMiddleware = ['protect', 'restrictTo', 'optionalAuth'];

    requiredMiddleware.forEach(mw => {
        if (!authMiddleware.includes(`export const ${mw}`)) {
            throw new Error(`Missing middleware: ${mw}`);
        }
    });
});

// Test 8: Error handler exists
test('Error handler is properly defined', () => {
    const errorHandler = fs.readFileSync(
        path.join(__dirname, '..', 'src', 'middleware', 'errorHandler.js'),
        'utf8'
    );

    if (!errorHandler.includes('class AppError')) {
        throw new Error('AppError class not found');
    }

    if (!errorHandler.includes('errorHandler')) {
        throw new Error('errorHandler function not found');
    }
});

// Test 9: Server configuration
test('Server is properly configured', () => {
    const serverContent = fs.readFileSync(
        path.join(__dirname, '..', 'src', 'server.js'),
        'utf8'
    );

    const requiredConfig = ['helmet', 'cors', 'express.json', 'rateLimit'];

    requiredConfig.forEach(config => {
        if (!serverContent.includes(config)) {
            throw new Error(`Missing configuration: ${config}`);
        }
    });
});

// Test 10: Environment example exists
test('Environment example file is complete', () => {
    const envExample = fs.readFileSync(
        path.join(__dirname, '..', '.env.example'),
        'utf8'
    );

    const requiredVars = [
        'DATABASE_URL',
        'JWT_SECRET',
        'PORT',
        'FRONTEND_URL',
    ];

    requiredVars.forEach(envVar => {
        if (!envExample.includes(envVar)) {
            throw new Error(`Missing environment variable: ${envVar}`);
        }
    });
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log('='.repeat(50));

if (failed === 0) {
    console.log('\n🎉 All validations passed! Backend structure is correct.\n');
    process.exit(0);
} else {
    console.log('\n⚠️  Some validations failed. Please fix the issues above.\n');
    process.exit(1);
}
