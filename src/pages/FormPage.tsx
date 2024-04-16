import React from 'react';
import AssignmentForm from '../components/Assignment/AssignmentForm';

const FormPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-light-neutral dark:bg-dark-neutral">
      <div className="mb-8">
        <AssignmentForm />
      </div>
    </main>
  );
};

export default FormPage;
