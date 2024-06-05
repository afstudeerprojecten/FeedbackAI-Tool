// DashboardPage.tsx

import React from 'react';
import DashboardUserOverview from '../components/Dashboard/DashboardUserOverview'; 
import DashboardUserChart from '../components/Dashboard/DashboardUserChart.tsx';


const DashboardPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-light-neutral dark:bg-dark-neutral">
      <DashboardUserOverview />
      <DashboardUserChart />
    </main>
  );
};

export default DashboardPage;