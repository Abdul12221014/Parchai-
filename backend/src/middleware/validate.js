import { validationResult } from 'express-validator';
import { AppError } from './errorHandler.js';

// Validation middleware
export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return next(new AppError(errorMessages.join(', '), 400));
    }

    next();
};
