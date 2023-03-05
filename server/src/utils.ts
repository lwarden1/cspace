/***
 * This file contains utility functions that may or may not be used throughout the application.
 */
import { prisma } from './prisma';
import { queryStudent, queryTeacher } from './cspace';
import { Request, Response, NextFunction, RequestHandler, json, ErrorRequestHandler } from 'express'
import { Prisma } from '@prisma/client';
import z from 'zod';

/** If the user is not logged in, redirect to the login page. Otherwise, continue to the next middleware */
export const validateUser: RequestHandler = (req: Request, res, next) => {
    // `!.` operator tells TS that the value will never be null or undefined
    if (req.session!.user || req.url.startsWith('/login')) {
        return next();
    }
    return res.redirect('/login');
};

export const parseJson = json();

export const handlePrismaError: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // clientVersion is an indicator that the error is a Prisma Client error
    if (err.clientVersion) {
        // If the error is not recoverable, throw it and let the process crash
        if (err instanceof Prisma.PrismaClientRustPanicError || err instanceof Prisma.PrismaClientInitializationError) {
            console.error(`[${req.baseUrl}] [Prisma]: ${err.message}`);
            throw err;
        }
    }
    next(err);
};

export function validateForm(form: z.AnyZodObject): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const f = form.safeParse(req.body);
        if (!f.success) {
            return res.status(400).send(JSON.stringify(f.error));
        }
        req.body = f.data;
        next();
    }
}
