import React from 'react';
import AssignmentForm from '../components/Assignment/AssignmentForm';
import { ToastContainer } from 'react-toastify';

const FormPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-light-neutral dark:bg-dark-neutral">
      <div className="mb-8">
        <AssignmentForm />
        <ToastContainer position="top-center" />

      </div>
    </main>
  );
};

export default FormPage;
