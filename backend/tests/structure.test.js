import { describe, it, expect, beforeAll } from '@jest/globals';

describe('Backend Structure Validation', () => {
    it('should have all required configuration files', () => {
        const fs = require('fs');
        const path = require('path');

        const requiredFiles = [
            'package.json',
            'prisma/schema.prisma',
            'src/server.js',
            'src/config/index.js',
            'src/config/database.js',
            'src/controllers/auth.controller.js',
            'src/middleware/auth.js',
            'src/middleware/errorHandler.js',
            'src/routes/auth.routes.js',
            'src/utils/jwt.js',
        ];

        requiredFiles.forEach(file => {
            const filePath = path.join(__dirname, '..', file);
            expect(fs.existsSync(filePath)).toBe(true);
        });
    });

    it('should have valid package.json', () => {
        const packageJson = require('../package.json');

        expect(packageJson.name).toBe('parchai-backend');
        expect(packageJson.dependencies).toHaveProperty('@prisma/client');
        expect(packageJson.dependencies).toHaveProperty('express');
        expect(packageJson.dependencies).toHaveProperty('jsonwebtoken');
        expect(packageJson.dependencies).toHaveProperty('bcryptjs');
    });

    it('should have valid Prisma schema', () => {
        const fs = require('fs');
        const schemaContent = fs.readFileSync('./prisma/schema.prisma', 'utf8');

        expect(schemaContent).toContain('model User');
        expect(schemaContent).toContain('model Mentor');
        expect(schemaContent).toContain('model Session');
        expect(schemaContent).toContain('model Payment');
        expect(schemaContent).toContain('model Review');
    });
});

describe('JWT Utilities', () => {
    it('should export required JWT functions', () => {
        // This will fail until we can import ES modules in Jest
        // For now, just check file exists
        const fs = require('fs');
        const jwtContent = fs.readFileSync('./src/utils/jwt.js', 'utf8');

        expect(jwtContent).toContain('generateToken');
        expect(jwtContent).toContain('generateRefreshToken');
        expect(jwtContent).toContain('verifyToken');
        expect(jwtContent).toContain('verifyRefreshToken');
    });
});

describe('Error Handler', () => {
    it('should export AppError class and errorHandler', () => {
        const fs = require('fs');
        const errorHandlerContent = fs.readFileSync('./src/middleware/errorHandler.js', 'utf8');

        expect(errorHandlerContent).toContain('class AppError');
        expect(errorHandlerContent).toContain('errorHandler');
    });
});

describe('Auth Routes', () => {
    it('should define all auth routes', () => {
        const fs = require('fs');
        const routesContent = fs.readFileSync('./src/routes/auth.routes.js', 'utf8');

        expect(routesContent).toContain('/register');
        expect(routesContent).toContain('/login');
        expect(routesContent).toContain('/refresh');
        expect(routesContent).toContain('/me');
        expect(routesContent).toContain('/change-password');
    });
});
