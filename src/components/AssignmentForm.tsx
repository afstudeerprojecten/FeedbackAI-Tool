import React, { useState } from 'react';

const AssignmentForm: React.FC = () => {
  const [course, setCourse] = useState<string>('Math'); // Mock data
  const [title, setTitle] = useState<string>(''); // New state for assignment title
  const [description, setDescription] = useState('');
  const [templates, setTemplates] = useState('');
  const [response, setResponse] = useState<string>('');

  // Placeholder function to simulate response from OpenAI API
  const generateTemplates = () => {
    // Check if templates is not empty and is a valid number
    if (templates !== '' && !isNaN(Number(templates))) {
      const numberOfTemplates = Number(templates);
      // Generate templates based on the description and number of templates
      const templatesArray = Array.from({ length: numberOfTemplates }, () => description);
      const placeholderResponse = templatesArray.join('\n');
      setResponse(placeholderResponse);
    } else {
      // Handle invalid input for number of templates
      setResponse('Please enter a valid number for the number of templates.');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here (e.g., send data to backend)
    console.log('Course:', course);
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Templates:', templates);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-base shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Assignment Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">
              Select Course
            </label>
            <select
              id="course"
              className="input input-bordered w-full mt-1"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Assignment Title
            </label>
            <input
              type="text"
              id="title"
              className="input input-bordered w-full mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
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
              className="input input-bordered w-full mt-1"
              value={templates}
              onChange={(e) => setTemplates(e.target.value)}
              required
            />
          </div>
          <button
            onClick={generateTemplates}
            className="btn btn-primary w-full"
          >
            Generate Templates
          </button>
        </form>
      </div>
      <div className="bg-base shadow-2xl rounded p-4 mb-4">
        <h2 className="text-2xl font-bold mb-4">Generated Templates</h2>
        <div className="border border-gray-300 p-2 rounded-md">{response}</div>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2">
          Accept Templates
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Decline Templates
        </button>
      </div>
    </div>
  );
};

export default AssignmentForm;
