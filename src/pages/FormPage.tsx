// FormPage.tsx
import React from 'react';
import AssignmentForm from '../components/AssignmentForm';
import TemplatesInterface from '../components/TemplatesInterface';
const FormPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <AssignmentForm />
      </div>
      <div className='mb-8'>
        <TemplatesInterface />
    </div>
    </div>
  );
};

export default FormPage;
