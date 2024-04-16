// OrganizationsOverviewPage.tsx

import React from 'react';
import AssignemntOverview from '../components/Assignment/AssignmentTableOverview'; // Adjust the path as per your project structure

const AssignemntOverviewPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-light-neutral dark:bg-dark-neutral">
    <AssignemntOverview />
    </main>
  );
};

export default AssignemntOverviewPage;
