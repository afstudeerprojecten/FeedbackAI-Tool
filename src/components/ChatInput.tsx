import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface Props {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<Props> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]); // State to store messages

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputValue.trim() === '') return;
    setIsLoading(true); // Set loading state before simulating API call
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock response from the API
      const mockApiResponse = 'Mock API Response';
      // Send the mock response to the parent component
      onSendMessage(inputValue);
      // Update messages state with the user's message
      const userMessage = { text: inputValue, sender: 'user' };
      // Update messages state with the user's message
      setMessages([...messages, userMessage]);
      // Update messages state with the mock response
      const botMessage = { text: mockApiResponse, sender: 'bot' };
      setMessages([...messages, botMessage]);
      setInputValue('');
      setIsLoading(false); // Set loading state back to false after response
    }, 1000); // Simulate 1 second delay
  };

  return (
    <div className="input-container">
      <textarea
        id='chat-input'
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here..."
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 max-w-full"
        rows={8} // Set the number of rows for the textarea
      />
      
      <button className="btn btn-primary mt-2 block mx-auto w-full" onClick={sendMessage}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default ChatInput;
