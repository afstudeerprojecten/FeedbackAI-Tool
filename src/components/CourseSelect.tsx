import React from 'react';

const CourseSelect: React.FC = () => {
  // Dummy data for courses
  const courses = ['Math', 'Science', 'History'];

  return (
    <div className="flex items-center justify-center h-screen">
      <select className="select select-bordered w-64">
        {courses.map(course => (
          <option key={course}>{course}</option>
        ))}
      </select>
    </div>
  );
};

export default CourseSelect;
