import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Assuming you have a Home component
import Navbar from './components/Navbar';
import ChatPage from './pages/ChatPage'; // Assuming you have a ChatPage component
import FormPage from './pages/FormPage';
// import RegisterUserForm from './components/RegisterUserForm';
import LoginPage from './pages/LoginPage';
import RegisterOrganisationPage from './pages/RegisterOrganisationPage';
import OrganizationsOverviewPage from './pages/OrganisationTableOverviewPage';
import RegisterTeacherPage from './pages/RegisterTeacherPage';
import TeacherOverviewPage from './pages/TeacherTableOverviewPage';
import UpdateTeacherPage from './pages/UpdateTeacherPage';
import RegisterCoursePage from './pages/RegisterCoursePage';
import CourseOverviewTable from './pages/CourseTableOverviewPage';
import RegisterAdminPage from './pages/RegisterAdminPage';
import AdminOverviewTablePage from './pages/AdminTableOverviewPage';
import RegisterStudentPage from './pages/RegisterStudentPage';
import StudentTableOverviewPage from './pages/StudentTableOverviewPage';
import AssignemntOverviewPage from './pages/AssignmentTableOverviewPage';
import AssignmentDescriptionPage from './pages/AssignmentDescriptionPage';
import TemplatesTableOverviewPage from './pages/TemplateTableOverviewPage';

const App: React.FC = () => {
  return (
    <Router basename="/FeedbackAI-Tool/">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/assignment" element={<FormPage />} />
        <Route path="/registerteacher" element={<RegisterTeacherPage />} />
        <Route path="/registercourse" element={<RegisterCoursePage />} />
        <Route path="/registerorg" element={<RegisterOrganisationPage />} />
        <Route path="/organisations" element={<OrganizationsOverviewPage />} />
        <Route path="/teachers" element={<TeacherOverviewPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/teacher/update" element={<UpdateTeacherPage />} />
        <Route path="/courses" element={<CourseOverviewTable />} />
        <Route path="/registeradmin" element={<RegisterAdminPage />} />
        <Route path="/admins" element={<AdminOverviewTablePage />} />
        <Route path="/registerstudent" element={<RegisterStudentPage />} />
        <Route path="/students" element={<StudentTableOverviewPage />} />
        <Route path="/assignments" element={<AssignemntOverviewPage />} />
        <Route path="/assignment/:id" element={<AssignmentDescriptionPage />} />
        <Route path="/assignment/:id/get_templates" element={<TemplatesTableOverviewPage />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
