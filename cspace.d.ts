/** CSpace header */

// Previews avoid sending an infinite amount of data :).
/** User preview.
 *
 * just uid and username for now */
type UserPreview = {
    uid: number;
    username: string;
}

/** Class preview. */
type ClassPreview = {
    uid: number;
    name: string;
    description: string;
    teacher: UserPreview;
    start: Date;
    end: Date;
    days: string;
}

/** Class preview including enrolled and waitlisted students for teacher view */
type ExtendedClassPreview = {
    uid: number;
    name: string;
    description: string;
    start: Date;
    end: Date;
    days: string;
    enrolled: UserPreview[];
    waitlisted: UserPreview[];
}

type User = {
    uid: number;
    username: string;
    isTeacher: boolean;
    enrolled?: ClassPreview[];
    waitlisted?: ClassPreview[];
    saved?: ClassPreview[];
    classes?: ExtendedClassPreview[];
}

type Student = {
    uid: number;
    username: string;
    enrolled: ClassPreview[];
    waitlisted: ClassPreview[];
    saved: ClassPreview[];
};

type Teacher = {
    uid: number;
    username: string;
    classes: ExtendedClassPreview[];
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
