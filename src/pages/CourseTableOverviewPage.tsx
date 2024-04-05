// OrganizationsOverviewPage.tsx

import React from 'react';
import CourseTableOverview from '../components/Course/CourseOverviewTable'; // Adjust the path as per your project structure

const CourseOverviewTable: React.FC = () => {
  return (
    <div className="container mx-auto">
      <CourseTableOverview />
    </div>
  );
};

export default CourseOverviewTable;
