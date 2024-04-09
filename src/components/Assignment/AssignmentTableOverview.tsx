import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAssigments } from "../../services/assignmentService";

const AssignmentTableOverview: React.FC = () => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch assignments data from a service
        const data = await fetchAssigments();
        setAssignments(data);
      } catch (error:any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleViewDescription = (id: number) => {
    navigate(`/assignment/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assignment Overview</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-base">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-base divide-y divide-gray-200">
          {assignments.map(assignment => (
            <tr key={assignment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{assignment.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleViewDescription(assignment.id)}>View Description</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTableOverview;
