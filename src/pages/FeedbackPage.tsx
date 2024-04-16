import React from 'react';
import FeedbackForm from '../components/Feedback/FeedbackForm';

const FeedbackPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-light-neutral dark:bg-dark-neutral">
      <div className="mb-8">
        <FeedbackForm/>
      </div>
    </main>
  );
};

export default FeedbackPage;
