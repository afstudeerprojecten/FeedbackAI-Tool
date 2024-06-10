import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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
import FeedbackPage from './pages/FeedbackPage';
import SubmissionOverviewPage from './pages/SubmissionTableOverviewPage';
import SubmissionContentPage from './pages/SubmissionContentPage';
import SubmissionFeedbackPage from './pages/SubmissionFeedbackPage';
import GenerateTemplatePage from './pages/GenerateTemplatePage';
import Unauthorized from './pages/UnauthorizedPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/assignment" element={<ProtectedRoute component={FormPage} requiredRole={["teacher"]} />} />
        <Route path="/registerteacher" element={<RegisterTeacherPage />} />
        <Route path="/registercourse" element={<RegisterCoursePage />} />
        <Route path="/registerorg" element={<RegisterOrganisationPage />} />
        <Route path="/organisations" element={<OrganizationsOverviewPage />} />
        <Route path="/teachers" element={<TeacherOverviewPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/teacher/update" element={<UpdateTeacherPage />} />
        <Route path="/courses" element={<CourseOverviewTable />} />
        <Route path="/registeradmin" element={<RegisterAdminPage />} />
        <Route path="/admins" element={<AdminOverviewTablePage />} />
        <Route path="/registerstudent" element={<RegisterStudentPage />} />
        <Route path="/students" element={<StudentTableOverviewPage />} />
        <Route path="/assignments" element={<AssignemntOverviewPage />} />
        <Route path="/assignment/:id" element={<AssignmentDescriptionPage />} />
        <Route path="/assignment/:id/get_templates" element={<TemplatesTableOverviewPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/submissions" element={<SubmissionOverviewPage />} />
        <Route path="/submission/:id" element={<SubmissionContentPage />} />
        <Route path="/feedback/:id" element={<SubmissionFeedbackPage />} />
        <Route path="/generate_template/:id" element={<GenerateTemplatePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
