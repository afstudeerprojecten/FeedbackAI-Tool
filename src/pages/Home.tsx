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
                                    <h1 className="text-5xl font-bold text-white">Hello there</h1>
                                    <p className="py-6 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                                    <Link to="/form" className="btn btn-primary">Get Started</Link>
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
