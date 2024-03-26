import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Assuming you have a Home component
import Navbar from './components/Navbar';
import ChatPage from './pages/ChatPage'; // Assuming you have a ChatPage component
import FormPage from './pages/FormPage';
// import RegisterUserForm from './components/RegisterUserForm';
import CourseRegistrationPage from './pages/CourseRegistrationPage';
import LoginPage from './pages/LoginPage';
import RegisterOrganisationPage from './pages/RegisterOrganisationPage';
import OrganizationsOverviewPage from './pages/OrganisationTableOverviewPage';
import RegisterTeacherPage from './pages/RegisterTeacherPage';

const App: React.FC = () => {
  return (
    <Router basename="/FeedbackAI-Tool/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/assignment" element={<FormPage />} />
        <Route path="/registerteacher" element={<RegisterTeacherPage />} />
        <Route path="/registercourse" element={<CourseRegistrationPage />} />
        <Route path="/registerorg" element={<RegisterOrganisationPage />} />
        <Route path="/organisations" element={<OrganizationsOverviewPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
