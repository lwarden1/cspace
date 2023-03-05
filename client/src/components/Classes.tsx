import React, { useEffect, useState } from 'react'
import { useRouteLoaderData } from 'react-router-dom';
import StudentClasses from '@components/StudentClasses';
import TeacherClasses from '@components/TeacherClasses';

export default function Classes() {
  const user = useRouteLoaderData("app") as SessionUser;
  console.log(`User: ${JSON.stringify(user)}`)
  const teacher = {
    uid: 0,
    username: "J. Doe",
  }
  const classes: ClassPreview[] = [
    {
      uid: 0,
      department: 0,
      number: 2320,
      section: 1,
      title: "Principle of Data Abstraction",
      start: new Date(2023, 5, 12, 9, 30),
      end: new Date(2023, 9, 12, 10, 20),
      days: "Mon,Wed,Fri",
      location: "CSI 257",
      status: 0,
      teacher,
      credits: 3,
    },
    {
      uid: 1,
      department: 0,
      number: 2322,
      section: 1,
      title: "Principle of Functional Languages",
      start: new Date(2023, 5, 12, 11, 30),
      end: new Date(2023, 9, 12, 12, 20),
      days: "Mon,Wed,Fri",
      location: "CSI 257",
      status: 0,
      teacher,
      credits: 3,
    },
  ];

  return (
    <div>
      <h1>{user.username}'s Classes</h1>
      {user.isTeacher ?
        <TeacherClasses classes={user.classes!} />
        : <StudentClasses classes={[...classes, ...user.enrolled!]} />
      }
      { /* Some sort of add/enroll button */}
    </div>
  )
}
