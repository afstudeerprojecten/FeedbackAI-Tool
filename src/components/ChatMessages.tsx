// ChatMessages.tsx

import React from 'react';

interface Message {
  text: string;
  sender: string;
}

interface Props {
  messages: Message[];
}

const ChatMessages: React.FC<Props> = ({ messages }) => {
  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
