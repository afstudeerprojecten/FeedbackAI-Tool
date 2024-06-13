import React from 'react';
import AssignmentHeading from '../components/Assignment/AssignmentHeading';
import AssignmentDetailOverview from '../components/Assignment/AssignmentDetailOverview';

const AssignmentFlowPage: React.FC = () => {
  const user = sessionStorage.getItem('user');
  const role = user ? JSON.parse(user).role : null;

  return (
    <main className="min-h-screen min-w-screen bg-neutral-100 dark:bg-dark-neutral text-light-text dark:text-dark-text">
      
      {role === 'teacher' &&
        <AssignmentHeading />
      }
      <AssignmentDetailOverview />
    </main>
  );
};

export default AssignmentFlowPage;