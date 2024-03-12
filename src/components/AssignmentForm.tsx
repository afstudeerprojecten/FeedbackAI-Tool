// AssignmentForm.tsx
import React, { useState } from 'react';

const AssignmentForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [templates, setTemplates] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here (e.g., send data to backend)
    console.log('Description:', description);
    console.log('Templates:', templates);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assignment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Assignment Description
          </label>
          <textarea
            id="description"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="templates" className="block text-sm font-medium text-gray-700">
            Number of Templates
          </label>
          <input
            type="number"
            id="templates"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={templates}
            onChange={(e) => setTemplates(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Generate Templates
        </button>
      </form>
    </div>
  );
};

export default AssignmentForm;
