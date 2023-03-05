import React from "react";
import styles from '@css/Schedule.module.css';
import { fmtTime } from "@/utils";

function classTitle(cls: TeacherClassPreview) {
    const departments = ["CSCI", "BUSN", "LIT"];
    return `${departments[cls.department]}-${cls.number}-${cls.section} (${cls.uid}) ${cls.title}`;
}

// const classEditor: React.FC = ({ cls }: { cls: TeacherClassPreview }) => {
//     return (
//         <div>Editor</div>
//     )
// }


export default function TeacherClasses({ classes }: { classes: TeacherClassPreview[] }) {
    return (
        <div className={styles["schedule__container"]}>
            <table className={styles["schedule__table"]}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Meeting Time</th>
                        <th>Location</th>
                        <th>Credits</th>
                        <th>Status</th>
                        <th>Enrolled</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((cls) => (
                        <tr key={cls.uid}>
                            <td>{classTitle(cls)}</td>
                            <td>{`${fmtTime(cls.start)}-${fmtTime(cls.end)}`}</td>
                            <td>{cls.location}</td>
                            <td>{cls.credits}</td>
                            <td>{cls.status}</td>
                            <td>{`${cls.enrolled.length}/${cls.capacity}`}</td>
                        </tr>
                    ))}
                    {/* Some sort of edit button */}
                </tbody>
            </table>
        </div>
    );
};
