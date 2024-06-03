// DashboardPage.tsx

import React from 'react';
import Dashboard from '../components/Dashboard/DashboardUserOverview'; // Adjust the path as per your project structure`

const DashboardPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-light-neutral dark:bg-dark-neutral">
      <Dashboard />
    </main>
  );
};

export default DashboardPage;