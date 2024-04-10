import React from 'react';
import FeedbackForm from '../components/Feedback/FeedbackForm';

const FeedbackPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="bg-base shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4 text-center">How To Use</h1>
          <p className="text-center mb-4">1. Select the course for the assignment from the dropdown.</p>
          <p className="text-center mb-4">2. Select the assignment.</p>
          <p className="text-center mb-4">3. Upload and Submit your work.</p>
        </div>
        <FeedbackForm/>
      </div>
    </div>
  );
};

export default FeedbackPage;
