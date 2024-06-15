import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAssigments } from "../../services/assignmentService";

const AssignmentTableOverview: React.FC = () => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAssigments();
        setAssignments(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    setShowTemplates(role === 'teacher');
  }, []);

  const handleViewDescription = (id: number) => {
    navigate(`/assignment/${id}`);
  };

  const handleViewTemplates = (id: number) => {
    navigate(`/assignment/${id}/get_templates`);
  };

  return (
    <div className="bg-light-neutral dark:bg-dark-neutral mx-4">
      <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text ml-4">Assignment Overview</h2>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead className="bg-light-neutral dark:bg-dark-neutral">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
                Description
              </th>
             {showTemplates && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
                Templates
              </th>}
              {showTemplates &&<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
                Generate
              </th>}
            </tr>
          </thead>
          <tbody className="bg-light-neutral dark:bg-dark-neutral divide-y divide-gray-200">
            {assignments.map(assignment => (
              <tr key={assignment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">{assignment.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">
                  <button onClick={() => handleViewDescription(assignment.id)}>View Description</button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">
                  {showTemplates && <button onClick={() => handleViewTemplates(assignment.id)}>View Templates</button>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text dark:text-dark-text">
                 {showTemplates &&  <Link to={`/generate_template/${assignment.id}`}>Generate Template</Link>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentTableOverview;
