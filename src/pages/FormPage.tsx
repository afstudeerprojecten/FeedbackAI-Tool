// FormPage.tsx
import React from 'react';
import AssignmentForm from '../components/AssignmentForm';
const FormPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <AssignmentForm />
      </div>
    </div>
  );
};

export default FormPage;
