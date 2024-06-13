import React from 'react';
import CourseImage from '../img/course.jpeg';
import OpenAIImage from '../img/openai.png';
//import FeedbackIcon from '../img/feedback-icon-21.png';

const SubjectCards: React.FC = () => {
    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-8">
            {/* Subject 1 */}
            <div className="card bg-white dark:bg-gray-800 p-6">
                <div className="flex justify-center">
                    <img src={OpenAIImage} alt="OpenAI" className="w-42 h-42" />
                </div>
                <p className="text-center text-lg font-semibold mt-4 text-light-text dark:text-dark-text">Template Generation</p>
                <p className="mt-2 text-center text-light-text dark:text-dark-text">Empower teachers to effortlessly create example templates for open-ended assignments, providing students with clear guidance and structure for their work.</p>
            </div>

            {/* Subject 2 */}
            <div className="card bg-white dark:bg-gray-800 p-6">
                <div className="flex justify-center">
                    <img src={CourseImage} alt="Course" className="w-42 h-42" />
                </div>
                <p className="text-center text-lg font-semibold mt-4 text-light-text dark:text-dark-text">Assignment Management</p>
                <p className="mt-2 text-center text-light-text dark:text-dark-text">Streamline the process of adding assignments to courses, enabling teachers to organize and assign tasks efficiently while maintaining flexibility in curriculum design.</p>
            </div>

            {/* Subject 3 */}
            <div className="card bg-white dark:bg-gray-800 p-6">
                <div className="flex justify-center">
                    <img src={OpenAIImage} alt="OpenAI" className="w-42 h-42" />
                </div>
                <p className="text-center text-lg font-semibold mt-4 text-light-text dark:text-dark-text">AI-Powered Feedback</p>
                <p className="mt-2 text-center text-light-text dark:text-dark-text">Enhance student learning outcomes by leveraging OpenAI's API to deliver insightful hints and feedback on assignments, fostering continuous improvement and personalized guidance.</p>
            </div>

            {/* Add more subjects here */}
        </div>
    );
};

export default SubjectCards;
