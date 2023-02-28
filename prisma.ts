import { PrismaClient, Prisma } from '@prisma/client';

/** Our PrismaClient */
export const prisma = new PrismaClient();

/** get Prisma UserPreview */
export const userPreviewQuery = Prisma.validator<Prisma.UserArgs>()({
    select: {
        uid: true,
        username: true
    }
});

/** get Prisma ClassPreview */
export const classPreviewQuery = Prisma.validator<Prisma.ClassArgs>()({
    select: {
        uid: true,
        name: true,
        description: true,
        start: true,
        end: true,
        days: true,
        teacher: userPreviewQuery
    }
});

/** get Prisma ExtendedClassPreview */
export const extendedClassPreviewQuery = Prisma.validator<Prisma.ClassArgs>()({
    select: {
        uid: true,
        name: true,
        description: true,
        start: true,
        end: true,
        days: true,
        enrolled: userPreviewQuery,
        waitlisted: userPreviewQuery
    }
});

/** get Prisma User with student fields, assuming User is valid */
export const studentQuery = Prisma.validator<Prisma.UserArgs>()({
    select: {
        uid: true,
        username: true,
        enrolled: classPreviewQuery,
        waitlisted: classPreviewQuery,
        saved: classPreviewQuery
    }
});


/** get Prisma User with teacher fields, assuming User is valid */
export const teacherQuery = Prisma.validator<Prisma.UserArgs>()({
    select: {
        uid: true,
        username: true,
        classes: extendedClassPreviewQuery
    }
});

export default prisma;
