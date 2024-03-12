// ChatPage.tsx

import React from 'react';
import ChatInterface from '../components/ChatInterface';

const ChatPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Interface</h1>
      <ChatInterface />
    </div>
  );
};

export default ChatPage;
