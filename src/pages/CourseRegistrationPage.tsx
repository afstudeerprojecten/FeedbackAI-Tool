// CourseRegistrationPage.tsx
import React from 'react';
import CourseRegistration from '../components/CourseRegistration';

const CourseRegistrationPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-base-300 flex items-center justify-center">
            <div className="bg-base-300 rounded-lg p-8 max-w-md w-full">
                <CourseRegistration />
            </div>
        </div>
    );
};

export default CourseRegistrationPage;
