import React from 'react';
import UploadDocumentsForm from '../components/Course/UploadDocumentsForm';

const UploadCourseDocumentsPage: React.FC = () => {
  return (
    <main className="min-h-screen min-w-screen bg-light-neutral dark:bg-dark-neutral">
        <UploadDocumentsForm/>

    </main>
  );
};

export default UploadCourseDocumentsPage;
