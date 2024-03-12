// TemplatesInterface.tsx
import React, { useState } from 'react';

const TemplatesInterface: React.FC = () => {
  const [response, setResponse] = useState<string>('');

  // Placeholder function to simulate response from OpenAI API
  const generateTemplates = () => {
    // Placeholder response
    const placeholderResponse = 'Template 1\nTemplate 2\nTemplate 3';
    setResponse(placeholderResponse);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generated Templates</h2>
      <button
        onClick={generateTemplates}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
      >
        Generate Templates
      </button>
      <div className="border border-gray-300 p-4 rounded-md">{response}</div>
    </div>
  );
};

export default TemplatesInterface;
