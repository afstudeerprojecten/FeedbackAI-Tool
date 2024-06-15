// AssignmentSelector.tsx
import React from 'react';
import { Course } from '../../Interfaces/interfaces';


interface CourseSelectorProps {
    courses: Course[];
    selectedCourse: string;
    onSelectCourse: (courseId: string) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ courses, selectedCourse, onSelectCourse }) => {
   
    return (
        <div>
            <label className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text" htmlFor="assignment">
                Choose a course from your organisation
            </label>

            <select 
                id="course" 
                value={selectedCourse} 
                onChange={(e) => onSelectCourse(e.target.value)}
                className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text dark:focus-dark-primary focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                required
            >

            <option value="">Select a course</option>
            {courses.map((course) => (
                <option key={course.id} value={course.id}>
                    {course.name}
                </option>
                ))
            }

            </select>
        </div>
    );
};

export default CourseSelector;