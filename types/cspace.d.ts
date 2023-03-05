import { Prisma } from '@prisma/client';
/** get Prisma UserPreview */
export declare const queryUserPreview: {
    select: {
        uid: true;
        username: true;
    };
};
/** get Prisma ClassPreview */
export declare const queryClassPreview: {
    select: {
        uid: true;
        department: true;
        number: true;
        section: true;
        title: true;
        credits: true;
        status: true;
        start: true;
        end: true;
        days: true;
        location: true;
        teacher: {
            select: {
                uid: true;
                username: true;
            };
        };
    };
};
/** get Prisma ExtendedClassPreview */
export declare const queryTeacherClassPreview: {
    select: {
        uid: true;
        department: true;
        number: true;
        section: true;
        title: true;
        credits: true;
        status: true;
        capacity: true;
        start: true;
        end: true;
        days: true;
        location: true;
        enrolled: {
            select: {
                uid: true;
                username: true;
            };
        };
        waitlisted: {
            select: {
                uid: true;
                username: true;
            };
        };
    };
};
/** get Prisma ClassDescription */
export declare const queryClassDescription: {
    select: {
        uid: true;
        department: true;
        number: true;
        section: true;
        title: true;
        description: true;
        prereqs: true;
        credits: true;
    };
};
/** get Prisma User with student fields, assuming User is valid */
export declare const queryStudent: {
    select: {
        uid: true;
        username: true;
        enrolled: {
            select: {
                uid: true;
                department: true;
                number: true;
                section: true;
                title: true;
                credits: true;
                status: true;
                start: true;
                end: true;
                days: true;
                location: true;
                teacher: {
                    select: {
                        uid: true;
                        username: true;
                    };
                };
            };
        };
        waitlisted: {
            select: {
                uid: true;
                department: true;
                number: true;
                section: true;
                title: true;
                credits: true;
                status: true;
                start: true;
                end: true;
                days: true;
                location: true;
                teacher: {
                    select: {
                        uid: true;
                        username: true;
                    };
                };
            };
        };
        saved: {
            select: {
                uid: true;
                department: true;
                number: true;
                section: true;
                title: true;
                credits: true;
                status: true;
                start: true;
                end: true;
                days: true;
                location: true;
                teacher: {
                    select: {
                        uid: true;
                        username: true;
                    };
                };
            };
        };
    };
};
/** get Prisma User with teacher fields, assuming User is valid */
export declare const queryTeacher: {
    select: {
        uid: true;
        username: true;
        classes: {
            select: {
                uid: true;
                department: true;
                number: true;
                section: true;
                title: true;
                credits: true;
                status: true;
                capacity: true;
                start: true;
                end: true;
                days: true;
                location: true;
                enrolled: {
                    select: {
                        uid: true;
                        username: true;
                    };
                };
                waitlisted: {
                    select: {
                        uid: true;
                        username: true;
                    };
                };
            };
        };
    };
};
declare global {
    type UserPreview = Prisma.UserGetPayload<typeof queryUserPreview>;
    type ClassPreview = Prisma.ClassGetPayload<typeof queryClassPreview>;
    type TeacherClassPreview = Prisma.ClassGetPayload<typeof queryTeacherClassPreview>;
    type ClassDescription = Prisma.ClassGetPayload<typeof queryClassDescription>;
    type Student = Prisma.UserGetPayload<typeof queryStudent>;
    type Teacher = Prisma.UserGetPayload<typeof queryTeacher>;
    type User = {
        isTeacher: boolean;
    } & (Student | Teacher);
    type SessionUser = {
        uid: number;
        username: string;
        isTeacher: boolean;
        classes?: TeacherClassPreview[];
        enrolled?: ClassPreview[];
        waitlisted?: ClassPreview[];
        saved?: ClassPreview[];
    };
}
