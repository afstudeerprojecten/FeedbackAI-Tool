import React from 'react';
import { Link } from 'react-router-dom';
import TeacherReviews from '../components/TeacherReviews';
import SubjectCards from '../components/SubjectCards';

const Home: React.FC = () => {
    return (
        <main className="min-h-screen bg-base">
            <div className="container mx-auto">
                {/* Hero section */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
                    <div className="col-span-full">
                        <div className="hero bg-base rounded-lg p-8">
                            <div className="hero-content text-center">
                                <div className="max-w-md">
                                    <h1 className="text-5xl font-bold text-white-100">Welcome!</h1>
                                    <p className="py-6 text-white-100">This tool allows you, as a teacher, to enter your assignments and let your students get feedback back from the AI to further help them with their assignments</p>
                                    <Link to="/registerteacher" className="btn btn-primary">Get Started</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
                    <div className="col-span-full">
                        <h2 className="text-3xl font-bold text-center mb-4">Features</h2>
                        <SubjectCards />
                    </div>
                </section>

                {/* Teacher reviews section */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
                    <div className="col-span-full">
                        <h2 className="text-3xl font-bold text-center mb-4">Teacher Reviews</h2>
                        <TeacherReviews />
                    </div>
                </section>

            </div>
        </main>
    );
};

export default Home;