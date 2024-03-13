import React from 'react';
import { Link } from 'react-router-dom';
import TeacherReviews from '../components/TeacherReviews';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto">
                {/* Hero section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
                    <div className="col-span-full">
                        <div className="hero bg-base rounded-lg p-8">
                            <div className="hero-content text-center">
                                <div className="max-w-md">
                                    <h1 className="text-5xl font-bold text-white">Welcome!</h1>
                                    <p className="py-6 text-white">This tool allows you, as a teacher, to enter your assignemts and let your students get feedback back from the AI to further help them with their assigments</p>
                                    <Link to="/registerteacher" className="btn btn-primary">Get Started</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Teacher reviews section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
                    <div className="col-span-full">
                        <TeacherReviews />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
