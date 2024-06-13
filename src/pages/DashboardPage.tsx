// DashboardPage.tsx

import React from 'react';
import DashboardUserOverview from '../components/Dashboard/DashboardUserOverview'; 
import DashboardUserChart from '../components/Dashboard/DashboardUserChart.tsx';
import DashboardSpendageChart from '../components/Dashboard/DashboardSpendageChart.tsx';
import SubmissionOverviewCard from '../components/Submission/SubmissionOverviewCard.tsx';


const DashboardPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-dark-neutral">
    <div className="container mx-auto pt-4">
      <div className="grid grid-cols-2 gap-4 ">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-h-96 overflow-auto">
          <DashboardUserOverview />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-h-96 overflow-auto">
          <SubmissionOverviewCard /> 
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <DashboardUserChart />
        </div>
        <div className='row bg-white dark:bg-gray-800 rounded-lg p-4 '>
        <DashboardSpendageChart/>
      </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8 pb-8">
      
      </div>
    </div>
  </main>
  );
};

export default DashboardPage;