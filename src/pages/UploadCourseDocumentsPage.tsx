import React from 'react';
import UploadDocumentsForm from '../components/Course/UploadDocumentsForm';
import { ToastContainer } from 'react-toastify';

const UploadCourseDocumentsPage: React.FC = () => {
  return (
    <main className="min-h-screen min-w-screen bg-neutral-100 dark:bg-dark-neutral">
          <UploadDocumentsForm/>
          <ToastContainer position="top-center" />
    </main>
  );
};

export default UploadCourseDocumentsPage;
