import React from 'react';
import UploadDocumentsForm from '../components/Course/UploadDocumentsForm';

const UploadCourseDocumentsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="bg-base shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4 text-center">How To Use</h1>
          <p className="text-center mb-4">1. Select the course you want to upload documents for from the dropdown.</p>
          <p className="text-center mb-4">2. Upload your document.</p>
        </div>
        <UploadDocumentsForm/>
      </div>
    </div>
  );
};

export default UploadCourseDocumentsPage;
