import React from 'react';
import { Link } from 'react-router-dom';
import TeacherReviews from '../components/Teacher/TeacherReviews';
import SubjectCards from '../components/SubjectCards';
import { ToastContainer } from 'react-toastify';
import DashboardUserHomePage from '../components/Dashboard/DashboardUserHomePage';
import DashboardTeacherHomeCard from '../components/Dashboard/DashboardTeacherHomeCard';
import DashboardUserOverview from '../components/Dashboard/DashboardUserOverview';
import SubmissionOverviewCard from '../components/Submission/SubmissionOverviewCard';

const Home: React.FC = () => {
    // Check if user is logged in and get user role from sessionStorage
    const user = sessionStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    

    // Function to determine the link based on user role
    const getStartedLink = () => {
        if (role === 'teacher') {
            return '/assignment';
        } else if (role === 'student') {
            return '/assignment';
        } else {
            return '/login';
        }
    };
    return (
        <main className="min-h-screen bg-neutral-100 dark:bg-dark-neutral">
            <div className="container mx-auto">
                {/* Hero section */}
                {role === null && (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
                    <div className="col-span-full">
                        <div className="hero bg-base rounded-lg p-8">
                            <div className="hero-content text-center">
                                <div className="max-w-7xl mx-auto mt-10">
                                    <h1 className="text-6xl font-bold text-light-text dark:text-dark-text">Revolutionize your feedback process with AI-driven insights directly integrated into your assignments.</h1>
                                    <p className="py-6 text-2xl text-light-text dark:text-dark-text">An E-Learning Platform that utilizes OpenAI's API to allows students to get instant personalized feedback, directly from the AI while also allowing teachers to generate example solutions for their assignments.</p>
                                    <Link to={getStartedLink()} className="btn btn-neutral dark:bg-dark-btn dark:text-light-text dark:btn-primary mt-8">Get Started</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                )}  
                {role === 'student' && (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-8">
                    <div className="col-span-full">
                        <DashboardUserHomePage role={role}/>
                    </div>
                </section>
                )} 
                {role === 'teacher' && (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-8">
                    <div className="col-span-full">
                        <DashboardTeacherHomeCard/>
                        <Link to={getStartedLink()} className="btn btn-neutral text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary mt-8">Get Started</Link>
                    </div>
                    <div className='bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 max-h-96 overflow-auto hover:overflow-y-scroll'><DashboardUserOverview/></div>
                    <div className='bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 max-h-96 overflow-auto hover:overflow-y-scroll'><SubmissionOverviewCard/></div>
                </section>
                )}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mt-16">
                    <div className="col-span-full">
                        <h2 className="text-3xl text-light-text font-bold text-center mb-4 dark:text-dark-text">Features</h2>
                        <SubjectCards />
                    </div>
                </section>

                {/* Teacher reviews section */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mt-16">
                    <div className="col-span-full">
                        <h2 className="text-3xl font-bold text-center mb-4 text-light-text dark:text-dark-text">Teacher Reviews</h2>
                        <TeacherReviews />
                    </div>
                </section>
                <ToastContainer position="top-center" />

            </div>
        </main>
    );
};

export default Home;