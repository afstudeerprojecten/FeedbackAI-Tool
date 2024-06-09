import React from 'react';
import AssignemntOverview from '../components/Assignment/AssignmentTableOverview'; // Adjust the path as per your project structure
import AssignmentHeading from '../components/Assignment/AssignmentHeading'; 

const AssignmentFlowPage: React.FC = () => {
  return (
    <main className="min-h-screen min-w-screen bg-light-neutral dark:bg-dark-neutral">
        <AssignmentHeading />
        <AssignemntOverview />
    </main>
  );
};

export default AssignmentFlowPage;