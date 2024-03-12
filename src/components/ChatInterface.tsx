// ChatInterface.tsx

import React, { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);

  const handleSendMessage = (inputValue: string) => {
    // Placeholder function to simulate sending a message
    const response = `You sent: ${inputValue}`;
    setMessages([...messages, { text: response, sender: 'user' }]);
  };

  return (
    <div>
      <ChatMessages messages={messages} />
      <br />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
