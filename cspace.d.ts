// CSpace header

// Defined in ./prisma.ts to take advantage of Prisma's type checking
// type UserPreview;
// type ClassPreview;
// type ExtendedClassPreview;
// type Student;
// type Teacher;

// Defined here because it's the type used in the session cookie
type User = {
    uid: number;
    username: string;
    isTeacher: boolean;
    classes?: TeacherClassPreview[];
    enrolled?: ClassPreview[];
    waitlisted?: ClassPreview[];
    saved?: ClassPreview[];
}

enum LoginError {
    /** The username was not found */
    USERNAME,
    /** The password was incorrect */
    PASSWORD
}

type LoginStatus = {
    success: boolean;
    error?: LoginError;
}
