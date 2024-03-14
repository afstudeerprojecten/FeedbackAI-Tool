// CourseRegistration.tsx
import React, { useState } from 'react';

const CourseRegistration: React.FC = () => {
    const [teacherName, setTeacherName] = useState('');
    const [courseName, setCourseName] = useState('');

    // Placeholder function for form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission here (e.g., send data to backend)
        console.log('Teacher Name:', teacherName);
        console.log('Course Name:', courseName);
    };

    return (
        <div className="min-h-screen bg-base">
            <div className="bg-base rounded-lg shadow-md p-8 max-w-md w-full">
                <h1 className="text-2xl font-semibold mb-4">Course Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700">Teacher Name</label>
                        <input
                            type="text"
                            id="teacherName"
                            className="input input-bordered w-full mt-1"
                            value={teacherName}
                            onChange={(e) => setTeacherName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                        <input
                            type="text"
                            id="courseName"
                            className="input input-bordered w-full mt-1"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register Course</button>
                </form>
            </div>
        </div>
    );
};

export default CourseRegistration;