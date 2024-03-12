// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-primary p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-lg">FeedbackAI-Tool</div>
                <div className="space-x-4">
                    <Link to="/" className="text-white hover:text-primary-light transition-colors duration-200">Home</Link>
                    <Link to="/chat" className="text-white hover:text-primary-light transition-colors duration-200">Chat</Link>
                    <Link to="/form" className="text-white hover:text-primary-light transition-colors duration-200">Form</Link>
                    {/* Add more navigation links as needed */}
                </div>
            </div>


        </nav>
    );
};

export default Navbar;
