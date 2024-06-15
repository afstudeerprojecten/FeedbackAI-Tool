import React from 'react';
import UploadDocumentsForm from '../components/Course/UploadDocumentsForm';
import { ToastContainer } from 'react-toastify';

const UploadCourseDocumentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-dark-neutral">
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <UploadDocumentsForm/>
        <ToastContainer position="top-center" />
      </div>
    </div>
  </div>
  );
};

export default UploadCourseDocumentsPage;
