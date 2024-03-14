import React from 'react';
import AssignmentForm from '../components/AssignmentForm';

const FormPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="bg-base shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4 text-center">How To Use</h1>
          <p className="text-center mb-4">1. Select the course for the assignment from the dropdown.</p>
          <p className="text-center mb-4">2. Enter the title for the assignment.</p>
          <p className="text-center mb-4">3. Provide a description of the assignment.</p>
          <p className="text-center mb-4">4. Specify the number of templates to generate.</p>
          <p className="text-center mb-8">5. Click on "Generate Templates" to generate the templates.</p>
        </div>
        <AssignmentForm />
      </div>
    </div>
  );
};

export default FormPage;
