import React from 'react';
import AssignmentHeading from '../components/Assignment/AssignmentHeading';
import AssignmentDetailOverview from '../components/Assignment/AssignmentDetailOverview';

const AssignmentFlowPage: React.FC = () => {
  const user = sessionStorage.getItem('user');
  const role = user ? JSON.parse(user).role : null;

  return (
    <main className="min-h-screen min-w-screen bg-light-neutral dark:bg-dark-neutral">
      
      {role === 'teacher' &&
        <AssignmentHeading />
      }
      <AssignmentDetailOverview />
    </main>
  );
};

export default AssignmentFlowPage;