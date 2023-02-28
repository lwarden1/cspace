/***
 * This file contains utility functions that are used throughout the application.
 */

import { Prisma } from '@prisma/client';
import { prisma, studentQuery, teacherQuery } from './prisma';
import { Request, Response, NextFunction, RequestHandler } from 'express'


/** If the user is not logged in, redirect to the login page. Otherwise, continue to the next middleware */
export const validateUser: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    // `!.` operator tells TS that the value will never be null or undefined
    if (req.session!.user) { next() } else { res.redirect('/login') };
};

/** If the provided username and password is valid, log the user in (req.session.user) and return { success: true }. Otherwise, return { success: false, error }. */
export async function login(req: Request, username: string, password: string): Promise<LoginStatus> {
    const _user = await prisma.user.findUnique({
        where: {
            username
        }
    });
    if (!_user) {
        return { success: false, error: LoginError.USERNAME };
    }
    if (_user.password !== password) {
        return { success: false, error: LoginError.PASSWORD };
    }
    req.session!.user = _user.isTeacher ? Object.assign(
        await prisma.user.findUnique({
            ...teacherQuery,
            where: {
                uid: _user.uid
            }
        }) as Teacher,
        { isTeacher: true }
    ) : Object.assign(
        await prisma.user.findUnique({
            ...studentQuery,
            where: {
                uid: _user.uid
            }
        }) as Student,
        { isTeacher: false }
    );
    return { success: true };
}
