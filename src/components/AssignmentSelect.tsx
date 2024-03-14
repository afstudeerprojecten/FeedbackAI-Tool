import React from 'react';

const AssignmentSelect: React.FC = () => {
  // Dummy data for assignments
  const assignments = ['Assignment 1', 'Assignment 2', 'Assignment 3'];

  return (
    <div className="flex items-center justify-center h-screen">
      <select className="select select-bordered w-64">
        {assignments.map(assignment => (
          <option key={assignment}>{assignment}</option>
        ))}
      </select>
    </div>
  );
};

export default AssignmentSelect;
