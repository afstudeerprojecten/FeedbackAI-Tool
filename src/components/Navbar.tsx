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
                    <Link to="/assignment" className="text-white hover:text-primary-light transition-colors duration-200">Create Assignment</Link>
                    <Link to="/registerteacher" className="text-white hover:text-primary-light transition-colors duration-200">Register Teacher</Link>
                    {/* Add more navigation links as needed */}
                </div>
                <label className="flex cursor-pointer gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    <input type="checkbox" value="light" className="toggle theme-controller" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>

                </label>
            </div>
        </nav>
    );
};

export default Navbar;
