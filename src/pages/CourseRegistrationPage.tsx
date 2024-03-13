// CourseRegistrationPage.tsx
import React from 'react';
import CourseRegistration from '../components/CourseRegistration';

const CourseRegistrationPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto py-8">
                <CourseRegistration />
            </div>
        </div>
    );
};

export default CourseRegistrationPage;
