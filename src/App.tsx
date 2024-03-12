import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Assuming you have a Home component
import Navbar from './components/Navbar';
import ChatPage from './pages/Chatpage'; // Assuming you have a ChatPage component

const App: React.FC = () => {
  return (
    <Router basename="/FeedbackAI-Tool">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
