// TeacherOverviewPage.tsx

import React from 'react';
import TeacherOverviewTable from '../components/TeacherTableOverview'; // Adjust the path as per your project structure

const TeacherOverviewPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <TeacherOverviewTable />
    </div>
  );
};

export default TeacherOverviewPage;
