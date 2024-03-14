import React from 'react';
import AssignmentForm from '../components/AssignmentForm';

const FormPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="bg-base shadow-2xl rounded px-8 py-6 mb-4">
          <h2 className="text-2xl font-bold mb-4">How To Use</h2>
          <p className="mb-4">Follow these steps to use the assignment form:</p>
          <ol className="list-decimal list-inside">
            <li className="mb-2">Enter the assignment description in the text area provided.</li>
            <li className="mb-2">Specify the number of templates you want to generate.</li>
            <li className="mb-2">Click on "Generate Templates" to create the templates.</li>
            <li className="mb-2">Review the generated templates below.</li>
            <li>Select either "Accept Templates" or "Decline Templates" based on your decision.</li>
          </ol>
        </div>
        <AssignmentForm />
      </div>
    </div>
  );
};

export default FormPage;
