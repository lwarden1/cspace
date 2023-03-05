import { Prisma } from '@prisma/client';
const ValidUserQuery = Prisma.validator<Prisma.UserArgs>()
const ValidClassQuery = Prisma.validator<Prisma.ClassArgs>()

/** get Prisma UserPreview */
export const queryUserPreview = ValidUserQuery({
    select: {
        uid: true,
        username: true
    }
});

/** get Prisma ClassPreview */
export const queryClassPreview = ValidClassQuery({
    select: {
        uid: true,
        department: true,
        number: true,
        section: true,
        title: true,
        credits: true,
        status: true,
        start: true,
        end: true,
        days: true,
        location: true,
        teacher: queryUserPreview,
    }
});

/** get Prisma ExtendedClassPreview */
export const queryTeacherClassPreview = ValidClassQuery({
    select: {
        uid: true,
        department: true,
        number: true,
        section: true,
        title: true,
        credits: true,
        status: true,
        capacity: true,
        start: true,
        end: true,
        days: true,
        location: true,
        enrolled: queryUserPreview,
        waitlisted: queryUserPreview
    }
});

/** get Prisma ClassDescription */
export const queryClassDescription = ValidClassQuery({
    select: {
        uid: true,
        department: true,
        number: true,
        section: true,
        title: true,
        description: true,
        prereqs: true,
        credits: true,
    }
});

/** get Prisma User with student fields, assuming User is valid */
export const queryStudent = ValidUserQuery({
    select: {
        uid: true,
        username: true,
        enrolled: queryClassPreview,
        waitlisted: queryClassPreview,
        saved: queryClassPreview
    }
});


/** get Prisma User with teacher fields, assuming User is valid */
export const queryTeacher = ValidUserQuery({
    select: {
        uid: true,
        username: true,
        classes: queryTeacherClassPreview
    }
});

declare global {
    type UserPreview = Prisma.UserGetPayload<typeof queryUserPreview>;
    type ClassPreview = Prisma.ClassGetPayload<typeof queryClassPreview>;
    type TeacherClassPreview = Prisma.ClassGetPayload<typeof queryTeacherClassPreview>;
    type ClassDescription = Prisma.ClassGetPayload<typeof queryClassDescription>;
    type Student = Prisma.UserGetPayload<typeof queryStudent>;
    type Teacher = Prisma.UserGetPayload<typeof queryTeacher>;
    type User = { isTeacher: boolean } & (Student | Teacher);
    type SessionUser = {
        uid: number;
        username: string;
        isTeacher: boolean;
        classes?: TeacherClassPreview[];
        enrolled?: ClassPreview[];
        waitlisted?: ClassPreview[];
        saved?: ClassPreview[];
    }
}
