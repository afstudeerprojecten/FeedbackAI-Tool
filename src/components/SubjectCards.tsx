import React from 'react';

const SubjectCards: React.FC = () => {
    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
            {/* Subject 1 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-center">
                    <img src="src/img/openai.png" alt="Math" className="w-42 h-42" />
                </div>
                <p className="text-center text-lg font-semibold mt-4">Template Generation</p>
                <p className="mt-2 text-center">Empower teachers to effortlessly create example templates for open-ended assignments, providing students with clear guidance and structure for their work.</p>
            </div>

            {/* Subject 2 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-center">
                    <img src="src/img/course.jpeg" alt="Science" className="w-42 h-42" />
                </div>
                <p className="text-center text-lg font-semibold mt-4">Assignment Management</p>
                <p className="mt-2 text-center">Streamline the process of adding assignments to courses, enabling teachers to organize and assign tasks efficiently while maintaining flexibility in curriculum design.</p>
            </div>

            {/* Subject 3 */}
            <div className="card shadow-2xl p-6">
                <div className="flex justify-center">
                    <img src="src/img/openai.png" alt="History" className="w-42 h-42" />
                </div>
                <p className="text-center text-lg font-semibold mt-4">AI-Powered Feedback</p>
                <p className="mt-2 text-center">Enhance student learning outcomes by leveraging OpenAI's API to deliver insightful hints and feedback on assignments, fostering continuous improvement and personalized guidance.</p>
            </div>

            {/* Add more subjects here */}
        </div>
    );
};

export default SubjectCards;
