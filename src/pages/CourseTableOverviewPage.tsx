// OrganizationsOverviewPage.tsx

import React from 'react';
import CourseTableOverview from '../components/Course/CourseOverviewTable'; // Adjust the path as per your project structure

const CourseOverviewTable: React.FC = () => {
  return (
    <div className="bg-light-neutral dark:bg-dark-neutral text-light-text dark:text-dark-text">
    <div className="container mx-auto">
      <CourseTableOverview />
    </div>
    </div>
  );
};

export default CourseOverviewTable;
