import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Assuming you have a Home component
import Navbar from './components/Navbar';
import ChatPage from './pages/ChatPage'; // Assuming you have a ChatPage component
import FormPage from './pages/FormPage';
import RegisterUserForm from './components/RegisterUserForm';
import CourseRegistrationPage from './pages/CourseRegistrationPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <Router basename="/FeedbackAI-Tool/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/assignment" element={<FormPage />} />
        <Route path="/registeruser" element={<RegisterUserForm />} />
        <Route path="/registercourse" element={<CourseRegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
