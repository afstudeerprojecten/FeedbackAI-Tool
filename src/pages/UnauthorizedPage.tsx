import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen bg-light-neutral dark:bg-dark-neutral flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl text-light-text dark:text-dark-text">Unauthorized Access</h1>
        <p className="text-lg text-light-text dark:text-dark-text">You do not have permission to view this page.</p>
        <Link to="/" className="text-indigo-500">Go to Home</Link>
      </div>
    </div>
  );
};

export default Unauthorized;
