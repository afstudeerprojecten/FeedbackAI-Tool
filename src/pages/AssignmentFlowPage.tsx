import React from 'react';
import AssignmentHeading from '../components/Assignment/AssignmentHeading'; 
import AssignmentDetailOverview from '../components/Assignment/AssignmentDetailOverview';

const AssignmentFlowPage: React.FC = () => {
  return (
    <main className="min-h-screen min-w-screen bg-light-neutral dark:bg-dark-neutral">
        <AssignmentHeading />
        <AssignmentDetailOverview />
    </main>
  );
};

export default AssignmentFlowPage;