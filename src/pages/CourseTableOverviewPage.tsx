// OrganizationsOverviewPage.tsx

import React from 'react';
import CourseTableOverview from '../components/Course/CourseOverviewTable'; // Adjust the path as per your project structure
import RegisterCourse from '../components/Course/RegisterCourse';

const CourseOverviewTable: React.FC = () => {
  return (
    <div className="bg-neutral-100 dark:bg-dark-neutral text-light-text dark:text-dark-text">
    <div className="container mx-auto w-3/4">
    <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4 pt-10 text-center">Courses</h1>
      <RegisterCourse />
      <CourseTableOverview />
    </div>
    </div>
  );
};

export default CourseOverviewTable;
