import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { fetchSubmissions } from "../../services/submissionService";

const SubmissionTableOverview: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch submissions data from a service
        const data = await fetchSubmissions();
        setSubmissions(data);
      } catch (error:any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

//   const handleViewSubmission = (id: number) => {
//     navigate(`/submission/${id}`);
//   };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Submission Overview</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-base">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assignment
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student
            </th>
          </tr>
        </thead>
        <tbody className="bg-base divide-y divide-gray-200">
          {submissions.map(submission => (
            <tr key={submission.id}>
              <td className="px-6 py-4 whitespace-nowrap">{submission.assignment_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{submission.student_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionTableOverview;