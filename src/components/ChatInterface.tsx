import React, { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatInterface: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedAssignment, setSelectedAssignment] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);

  const handleSendMessage = (inputValue: string) => {
    const response = `You sent: ${inputValue}`;
    setMessages([...messages, { text: response, sender: 'user' }]);
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Course and Assignment Selection</h1>
      <div className="flex justify-center mb-8">
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Select Course</label>
            <select
              id="course"
              className="input input-bordered w-full mt-1"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="history">History</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="assignment" className="block text-sm font-medium text-gray-700">Select Assignment</label>
            <select
              id="assignment"
              className="input input-bordered w-full mt-1"
              disabled={!selectedCourse}
              value={selectedAssignment}
              onChange={(e) => setSelectedAssignment(e.target.value)}
            >
              <option value="">Select...</option>
              {selectedCourse === 'math' && (
                <>
                  <option value="algebra">Algebra</option>
                  <option value="geometry">Geometry</option>
                </>
              )}
              {selectedCourse === 'science' && (
                <>
                  <option value="biology">Biology</option>
                  <option value="chemistry">Chemistry</option>
                </>
              )}
              {selectedCourse === 'history' && (
                <>
                  <option value="ancient-history">Ancient History</option>
                  <option value="world-war-ii">World War II</option>
                </>
              )}
            </select>
          </div>
        </form>
      </div>
      <div className="container mx-auto flex flex-col items-center">
        <ChatMessages messages={messages} />
        <br />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
