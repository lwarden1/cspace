import React from "react";
import { fmtTime } from "../utils";
import styles from './assets/Schedule.module.css';

function classTitle(cls: ClassPreview) {
    const departments = ["CSCI", "BUSN", "LIT"];
    return `${departments[cls.department]}-${cls.number}-${cls.section} (${cls.uid}) ${cls.title}`;
}

export default function StudentClasses({ classes }: { classes: ClassPreview[] }) {
    return (
        <div className={styles["schedule__container"]}>
            <table className={styles["schedule__table"]}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Meeting Time</th>
                        <th>Location</th>
                        <th>Faculty</th>
                        <th>Credits</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((cls) => (
                        <tr key={cls.uid}>
                            <td>{classTitle(cls)}</td>
                            <td>{`${fmtTime(cls.start)}-${fmtTime(cls.end)}`}</td>
                            <td>{cls.location}</td>
                            <td>{cls.teacher.username}</td>
                            <td>{cls.credits}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
