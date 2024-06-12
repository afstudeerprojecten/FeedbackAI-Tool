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
        <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="assignment">
                Choose a course from your organisation
            </label>

            <select 
                id="course" 
                value={selectedCourse} 
                onChange={(e) => onSelectCourse(e.target.value)}
                className="w-full border rounded px-3 py-2"
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