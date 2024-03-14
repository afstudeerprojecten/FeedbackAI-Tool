// AssignmentDetails.tsx
import React from 'react';

interface AssignmentDetailsProps {
  assignmentDescription: string;
  teacherName: string;
}

const AssignmentDetails: React.FC<AssignmentDetailsProps> = ({ assignmentDescription, teacherName }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold">{teacherName}</h2>
      <p>{assignmentDescription}</p>
    </div>
  );
};

export default AssignmentDetails;