import React from 'react';

import { getCourses, getUserProgress } from '@/db/queries';

import List from './list';

const CoursesPage = async () => {
  const coursesData = await getCourses();
  const userProgressData = await getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="h-full px-6 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Courses Page</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;
