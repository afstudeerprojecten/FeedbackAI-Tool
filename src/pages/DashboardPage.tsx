// DashboardPage.tsx

import React from 'react';
import DashboardUserOverview from '../components/Dashboard/DashboardUserOverview'; 
import DashboardUserChart from '../components/Dashboard/DashboardUserChart.tsx';


const DashboardPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-light-neutral dark:bg-dark-neutral">
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-4">
          <DashboardUserOverview />
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-4">
          <DashboardUserChart />
        </div>
      </div>
    </div>
  </main>
  );
};

export default DashboardPage;