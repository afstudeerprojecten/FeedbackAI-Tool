import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Assuming you have a Home component
import Navbar from './components/Navbar';
import ChatPage from './pages/ChatPage'; // Assuming you have a ChatPage component
import FormPage from './pages/FormPage';
import RegisterTeacherForm from './components/RegisterTeacherForm';
import CourseRegistrationPage from './pages/CourseRegistrationPage';

const App: React.FC = () => {
  return (
    <Router basename="/FeedbackAI-Tool/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/assignment" element={<FormPage />} />
        <Route path="/registerteacher" element={<RegisterTeacherForm />} />
        <Route path="/registercourse" element={<CourseRegistrationPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
