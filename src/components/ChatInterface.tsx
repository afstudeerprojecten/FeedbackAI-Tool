import React, { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatInterface: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>(''); // Dummy data
  const [selectedAssignment, setSelectedAssignment] = useState<string>(''); // Dummy data
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);

  const handleSendMessage = (inputValue: string) => {
    // Placeholder function to simulate sending a message
    const response = `You sent: ${inputValue}`;
    setMessages([...messages, { text: response, sender: 'user' }]);
  };

  return (
    <div>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Course and Assignment Selection</h1>
        <div className="flex justify-center">
          {/* Course and Assignment Selection Form */}
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
                {/* Add more options as needed */}
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
                {/* Assignments based on selected course */}
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
      </div>
      {/* Chat Interface */}
      <div className="container mx-auto p-8">
        <ChatMessages messages={messages} />
        <br />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
